import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CardLanguage, Flashcard } from './entities/flashcard.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { UpdateCardDto } from './dto/update-card.dto';

@Injectable()
export class FlashCardService {
  constructor(
    @InjectRepository(Flashcard)
    private readonly flashCardRepo: Repository<Flashcard>,
  ) {}

  async create(userId: string, dto: CreateCardDto) {
    const card = this.flashCardRepo.create({
      ...dto,
      userId,
    });
    return this.flashCardRepo.save(card);
  }

  async stats(userId: string) {
    const total = await this.flashCardRepo.count({ where: { userId } });
    const en = await this.flashCardRepo.count({
      where: { userId, language: CardLanguage.EN },
    });
    const jp = await this.flashCardRepo.count({
      where: { userId, language: CardLanguage.JP },
    });
    return { total, en, jp };
  }

  async findOne(userId: string, id: string) {
    return this.flashCardRepo.findOneBy({ id, userId });
  }
  async update(userId: string, dto: UpdateCardDto) {
    await this.flashCardRepo.update({ id: dto.cardId, userId }, dto);
    return this.findOne(userId, dto.cardId);
  }

  async remove(userId: string, id: string) {
    await this.flashCardRepo.delete({ id, userId });
    return { ok: true };
  }

  async list(
    userId: string,
    lang?: CardLanguage,
    page = 1,
    limit = 20,
    q?: string,
  ) {
    const where: FindOptionsWhere<Flashcard> = { userId };
    if (lang) where.language = lang;
    if (q) where.front = q; // 如需模糊搜尋可改用 ILike(`%${q}%`)（Postgres）；MySQL 用 Like

    const [items, count] = await this.flashCardRepo.findAndCount({
      where,
      order: { updatedAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    return { items, page, limit, count };
  }
}
