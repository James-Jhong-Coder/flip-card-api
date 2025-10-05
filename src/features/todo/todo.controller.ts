import { Controller } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('todo')
export class TodoController {
  constructor(private readonly configService: ConfigService) {}
}
