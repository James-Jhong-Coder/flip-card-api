import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import type { ResultSetHeader } from 'mysql2';
import { RegisterDto, UserRow } from '@/types/user';

@Injectable()
export class UsersService {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async findByEmail(email: string): Promise<UserRow | null> {
    const rows = await this.dataSource.query<UserRow[]>(
      'SELECT * FROM users WHERE email = ? LIMIT 1',
      [email],
    );
    return rows[0] ?? null;
  }

  async findById(id: number): Promise<UserRow | null> {
    const rows = await this.dataSource.query<UserRow[]>(
      'SELECT * FROM users WHERE id = ? LIMIT 1',
      [id],
    );
    return rows[0] ?? null;
  }

  async create(registerData: RegisterDto) {
    const { password, email, name } = registerData;
    const hash = await bcrypt.hash(password, 10);
    const res = await this.dataSource.query<ResultSetHeader>(
      'INSERT INTO users (email, password_hash, name) VALUES (?, ?, ?)',
      [email, hash, name ?? null],
    );
    const newId = res.insertId;
    return this.findById(newId);
  }
}
