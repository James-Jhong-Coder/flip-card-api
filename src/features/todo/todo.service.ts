import { Injectable } from '@nestjs/common';

@Injectable()
export class TodoService {
  private todos: any[] = [];

  public addTodo(todo: any) {
    this.todos.push(todo);
  }

  public getTodos() {
    return this.todos;
  }
}
