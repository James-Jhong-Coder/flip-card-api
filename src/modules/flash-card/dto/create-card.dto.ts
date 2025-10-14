import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCardDto {
  @IsString()
  language: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  front: string; // 正面內容

  @IsString()
  @IsNotEmpty()
  back: string; // 背面內容
}
