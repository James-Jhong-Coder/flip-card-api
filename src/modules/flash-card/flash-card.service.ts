import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ResultSetHeader } from 'mysql2';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { FlashCardListSearchParams, FlashCardRow, LANGUAGE_TYPE } from './types/flashcard.type';

@Injectable()
export class FlashCardService {
  constructor(private readonly dataSource: DataSource) {}

  async create(userId: number, dto: CreateCardDto) {
    const sql = `
      INSERT INTO flashcards (user_id, language, front, back)
      VALUES (?, ?, ?, ?)
    `;
    const params = [userId, dto.language, dto.front, dto.back];
    const res = await this.dataSource.query<ResultSetHeader>(sql, params);
    const id = res.insertId;
    return this.findOne(Number(userId), id);
  }

  async findOne(userId: number, id: number) {
    const sql = `
      SELECT * FROM flashcards WHERE id = ? AND user_id = ? LIMIT 1
    `;
    const params = [id, userId];
    const rows = await this.dataSource.query<FlashCardRow[]>(sql, params);
    const row = rows[0];
    if (!row) throw new NotFoundException('Card not found');
    return {
      id: row.id,
      userId: row.user_id,
      language: row.language,
      front: row.front,
      back: row.back,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  async stats(userId: number) {
    const [{ total }] = await this.dataSource.query<{ total: number }[]>(
      `SELECT COUNT(*) AS total FROM flashcards WHERE user_id = ?`,
      [userId],
    );

    const [{ en }] = await this.dataSource.query<{ en: number }[]>(
      `SELECT COUNT(*) AS en FROM flashcards WHERE user_id = ? AND language = 'EN'`,
      [userId],
    );

    const [{ jp }] = await this.dataSource.query<{ jp: number }[]>(
      `SELECT COUNT(*) AS jp FROM flashcards WHERE user_id = ? AND language = 'JP'`,
      [userId],
    );

    return { total, en, jp };
  }

  async update(userId: number, dto: UpdateCardDto) {
    const { cardId, language, front, back } = dto;
    const current = await this.dataSource.query<FlashCardRow[]>(
      `SELECT * FROM flashcards WHERE id = ? AND user_id = ? LIMIT 1`,
      [cardId, userId],
    );
    const row = current[0];
    if (!row) throw new NotFoundException('Card not found');
    const nextLanguage = (language ?? row.language) as 'EN' | 'JP';
    const nextFront = front ?? row.front;
    const nextBack = back ?? row.back;
    await this.dataSource.query<ResultSetHeader>(
      `UPDATE flashcards
         SET language = ?, front = ?, back = ?
       WHERE id = ? AND user_id = ?`,
      [nextLanguage, nextFront, nextBack, cardId, userId],
    );

    return this.findOne(userId, cardId);
  }

  async remove(userId: number, id: number) {
    await this.dataSource.query<ResultSetHeader>(
      `DELETE FROM flashcards WHERE id = ? AND user_id = ?`,
      [id, userId],
    );
    return {};
  }

  async list(searchParams: FlashCardListSearchParams) {
    const { userId, language, page = 1, limit = 20, front, back } = searchParams;
    const _page = Math.max(1, Number(page) || 1);
    const _limit = Math.min(100, Math.max(1, Number(limit) || 20));
    const offset = (_page - 1) * _limit;
    const where: string[] = ['user_id = ?'];
    const params: any[] = [userId];
    if (language) {
      where.push('language = ?');
      params.push(language);
    }
    if (front?.trim()) {
      where.push('front LIKE ?');
      params.push(`%${front.trim()}%`);
    }
    if (back?.trim()) {
      where.push('back LIKE ?');
      params.push(`%${back.trim()}%`);
    }
    const whereSql = `WHERE ${where.join(' AND ')}`;
    const listSql = `
      SELECT id, user_id, language, front, back, created_at, updated_at
      FROM flashcards
      ${whereSql}
      ORDER BY updated_at DESC, id DESC
      LIMIT ? OFFSET ?
    `;
    const listRows = await this.dataSource.query<FlashCardRow[]>(listSql, [
      ...params,
      _limit,
      offset,
    ]);

    const countSql = `SELECT COUNT(*) AS count FROM flashcards ${whereSql}`;
    const [{ count }] = await this.dataSource.query<{ count: number }[]>(countSql, params);

    const items = listRows.map((row) => ({
      id: row.id,
      userId: row.user_id,
      language: row.language,
      front: row.front,
      back: row.back,
      createdAt: new Date(row.created_at).getTime(),
      updatedAt: new Date(row.updated_at).getTime(),
    }));
    return {
      items,
      page: _page,
      limit: _limit,
      count: Number(count),
    };
  }
  async getStudyCards(language: LANGUAGE_TYPE, limit = 30) {
    const sql = `
      SELECT id, language, front, back, created_at, updated_at
      FROM flashcards
      WHERE language = ?
      ORDER BY RAND()
      LIMIT ?
    `;
    const rows = await this.dataSource.query<FlashCardRow[]>(sql, [language, limit]);
    return {
      rows,
    };
  }
}
