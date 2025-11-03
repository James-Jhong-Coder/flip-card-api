import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('hello')
  sayHello() {
    return 'hello world';
  }
}
