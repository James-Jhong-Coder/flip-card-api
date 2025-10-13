import { Module } from '@nestjs/common';
import { FlashCardController } from './flash-card.controller';
import { FlashCardService } from './flash-card.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flashcard } from './entities/flashcard.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Flashcard])],
  controllers: [FlashCardController],
  providers: [FlashCardService],
  exports: [FlashCardService],
})
export class FlashCardModule {}
