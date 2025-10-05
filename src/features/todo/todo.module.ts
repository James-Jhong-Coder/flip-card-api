import {
  BeforeApplicationShutdown,
  Module,
  OnApplicationBootstrap,
  OnApplicationShutdown,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

@Module({
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  onModuleInit() {
    console.log(TodoModule.name, 'OnModuleInit');
  }
  onApplicationBootstrap() {
    console.log(TodoModule.name, 'OnApplicationBootstrap');
  }
  onModuleDestroy() {
    console.log(TodoModule.name, 'OnModuleDestroy');
  }
  beforeApplicationShutdown() {
    console.log(TodoModule.name, 'beforeApplicationShutdown');
  }
  onApplicationShutdown() {
    console.log(TodoModule.name, 'onApplicationShutdown');
  }
}
