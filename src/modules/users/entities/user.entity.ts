import {
  Column,
  CreateDateColumn,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Index({ unique: true })
  @Column({ length: 120 })
  email: string;

  @Column({ length: 60 })
  passwordHash: string;

  @Column({ length: 50, nullable: true })
  name?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
