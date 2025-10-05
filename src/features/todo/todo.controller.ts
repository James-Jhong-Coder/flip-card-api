import {
  Controller,
  Get,
  OnModuleInit,
  OnApplicationBootstrap,
  OnModuleDestroy,
  BeforeApplicationShutdown,
  OnApplicationShutdown,
} from '@nestjs/common';

@Controller('todo')
export class TodoController
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  onModuleInit() {
    console.log(TodoController.name, 'OnModuleInit');
  }

  onApplicationBootstrap() {
    console.log(TodoController.name, 'OnApplicationBootstrap');
  }

  onModuleDestroy() {
    console.log(TodoController.name, 'OnModuleDestroy');
  }

  beforeApplicationShutdown(signal?: string) {
    console.log(TodoController.name, 'beforeApplicationShutdown', signal);
  }

  onApplicationShutdown(signal?: string) {
    console.log(TodoController.name, 'onApplicationShutdown', signal);
  }

  @Get()
  findAll() {
    return ['todo-1', 'todo-2'];
  }
}
