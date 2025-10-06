import {
  Body,
  Controller,
  Get,
  Param,
  ParseArrayPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ParseIntPipe } from '../../pipes/parse-int/parse-int.pipe';
import { CreateBookDto } from './dto/create-book-dto';
import { UpdateBookDto } from './dto/update-book-dto';

@Controller('books')
export class BookController {
  @Get('getBooksArray')
  getBooks(
    @Query(
      'ids',
      new ParseArrayPipe({
        items: Number, // 每個元素要轉成 number
        separator: ',', // 使用逗號分隔：ids=1,2,3
        optional: false,
      }),
    )
    ids: number[],
  ) {
    return { ids };
  }

  @Get(':id')
  getBook(@Param('id', ParseIntPipe) id: number) {
    return {
      id,
      book: 'NestJS tutorial',
      author: 'James',
    };
  }

  @Post()
  createBook(@Body() dto: CreateBookDto) {
    return dto;
  }
  @Patch(':id')
  updateBook(@Param('id') id: string, @Body() dto: UpdateBookDto) {
    return {
      id,
      ...dto,
    };
  }
}
