// src/modules/cards/dto/create-card.dto.ts
import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { CardLanguage } from '../entities/flashcard.entity';

export class CreateCardDto {
  @IsEnum(CardLanguage)
  language: CardLanguage;

  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  front: string; // 正面內容

  @IsString()
  @IsNotEmpty()
  back: string; // 背面內容
}
