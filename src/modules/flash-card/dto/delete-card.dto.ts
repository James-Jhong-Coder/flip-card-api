import { IsInt } from 'class-validator';

export class DeleteCardDto {
  @IsInt()
  id: number;
}
