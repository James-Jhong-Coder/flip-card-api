import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import * as bcrypt from 'bcrypt';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Index({ unique: true })
  @Column({ length: 120 })
  email: string;

  @Column({ length: 60 })
  passwordHash: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  name?: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  async setPassword(plain: string) {
    const salt = await bcrypt.genSalt(10);
    this.passwordHash = await bcrypt.hash(plain, salt);
  }

  async comparePassword(plain: string) {
    return bcrypt.compare(plain, this.passwordHash);
  }
}
