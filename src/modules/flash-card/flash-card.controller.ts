import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FlashCardService } from './flash-card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { DeleteCardDto } from './dto/delete-card.dto';
import type { LANGUAGE_TYPE } from './types/flashcard.type';

@UseGuards(JwtAuthGuard)
@Controller('flash-card')
export class FlashCardController {
  constructor(private readonly flashCardService: FlashCardService) {}

  @Get('stats')
  stats(@Req() req: any) {
    const userId = Number(req.user.id);
    return this.flashCardService.stats(userId);
  }

  @Post()
  create(@Req() req: any, @Body() dto: CreateCardDto) {
    const userId = Number(req.user.id);
    return this.flashCardService.create(userId, dto);
  }

  @Patch()
  update(@Req() req: any, @Body() dto: UpdateCardDto) {
    const userId = Number(req.user.id);
    return this.flashCardService.update(userId, dto);
  }

  @Get()
  list(
    @Req() req: any,
    @Query('language') language?: LANGUAGE_TYPE,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit = 20,
    @Query('front') front?: string,
    @Query('back') back?: string,
  ) {
    const userId = Number(req.user.id);
    const searchParams = {
      userId,
      language,
      page,
      limit,
      front,
      back,
    };
    return this.flashCardService.list(searchParams);
  }

  @Delete()
  remove(@Req() req: any, @Body() dto: DeleteCardDto) {
    const userId = Number(req.user.id);
    return this.flashCardService.remove(userId, dto.cardId);
  }

  @Get('study')
  getStudyCard(
    @Query('language') language: LANGUAGE_TYPE,
    @Query('limit', new DefaultValuePipe(30), ParseIntPipe) limit = 30,
  ) {
    return this.flashCardService.getStudyCards(language, limit);
  }
}
