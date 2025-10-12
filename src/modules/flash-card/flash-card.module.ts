import { Module } from '@nestjs/common';
import { FlashCardController } from './flash-card.controller';
import { FlashCardService } from './flash-card.service';

@Module({
  controllers: [FlashCardController],
  providers: [FlashCardService]
})
export class FlashCardModule {}
