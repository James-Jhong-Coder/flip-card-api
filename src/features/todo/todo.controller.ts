import { Body, Controller, Post } from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  addTodo(@Body() data: any) {
    this.todoService.addTodo(data);
    return data;
  }
}
