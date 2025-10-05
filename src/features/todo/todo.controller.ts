import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

interface Todo {
  id?: string | number;
  title: string;
}

@Controller('todos')
export class TodoController {
  public todos: Todo[] = [];

  // 查詢全部
  @Get()
  getAllTodo(@Query('page') page = 1): Todo[] {
    console.log(page);
    return this.todos;
  }

  // 查詢單筆
  @Get(':id')
  getTodo(@Param('id') id: string) {
    return this.todos.filter((item) => item.id === id);
  }

  // 新增
  @Post()
  createTodo(@Body() data: Todo) {
    this.todos.push(data);
  }
}
