import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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
import { CardLanguage } from './entities/flashcard.entity';

@UseGuards(JwtAuthGuard)
@Controller('flash-card')
export class FlashCardController {
  constructor(private readonly flashCardService: FlashCardService) {}

  @Get('stats')
  stats(@Req() req: any) {
    return this.flashCardService.stats(req.user.id);
  }

  @Post()
  create(@Req() req: any, @Body() dto: CreateCardDto) {
    return this.flashCardService.create(req.user.id, dto);
  }

  @Get()
  list(
    @Req() req: any,
    @Query('lang') lang?: CardLanguage,
    @Query('page') page = '1',
    @Query('limit') limit = '20',
    @Query('q') q?: string,
  ) {
    return this.flashCardService.list(
      req.user.id,
      lang,
      Number(page),
      Number(limit),
      q,
    );
  }

  @Patch()
  update(@Req() req: any, @Body() dto: UpdateCardDto) {
    return this.flashCardService.update(req.user.id, dto);
  }

  @Delete(':id')
  remove(@Req() req: any, @Param('id') id: string) {
    return this.flashCardService.remove(req.user.id, id);
  }
}
