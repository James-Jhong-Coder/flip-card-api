import { Module } from '@nestjs/common';
import { FlashCardController } from './flash-card.controller';
import { FlashCardService } from './flash-card.service';

@Module({
  imports: [],
  controllers: [FlashCardController],
  providers: [FlashCardService],
  exports: [FlashCardService],
})
export class FlashCardModule {}
