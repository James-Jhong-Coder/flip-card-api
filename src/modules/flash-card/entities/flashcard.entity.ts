// src/modules/cards/entities/flashcard.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

export enum CardLanguage {
  EN = 'EN',
  JP = 'JP',
}

@Entity('flashcards')
export class Flashcard {
  @PrimaryGeneratedColumn()
  id: string;

  @Index()
  @Column({ type: 'varchar', length: 36 })
  userId: string;

  @Index()
  @Column({ type: 'enum', enum: CardLanguage })
  language: CardLanguage;

  // 正面
  @Column({ type: 'varchar', length: 256 })
  front: string;

  // 反面
  @Column({ type: 'text' })
  back: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
