import {
  BadRequestException,
  Controller,
  Get,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    const errorObj = {
      code: HttpStatus.BAD_REQUEST,
      message: '發生錯誤',
    };
    throw new HttpException(errorObj, HttpStatus.BAD_REQUEST);
    return this.appService.getHello();
  }

  @Get('test1')
  getHello1(): string {
    const errorObj = {
      code: HttpStatus.BAD_REQUEST,
      message: '發生錯誤',
    };

    throw new BadRequestException(errorObj);
    return this.appService.getHello();
  }
  @Get('test2')
  getHello2(): string {
    throw new BadRequestException('發生錯誤');
    return this.appService.getHello();
  }
}
