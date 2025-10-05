import {
  BeforeApplicationShutdown,
  Module,
  OnApplicationBootstrap,
  OnApplicationShutdown,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './features/todo/todo.module';

@Module({
  imports: [TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  onModuleInit() {
    console.log(AppModule.name, 'OnModuleInit');
  }
  onApplicationBootstrap() {
    console.log(AppModule.name, 'OnApplicationBootstrap');
  }
  onModuleDestroy() {
    console.log(AppModule.name, 'OnModuleDestroy');
  }
  beforeApplicationShutdown() {
    console.log(AppModule.name, 'beforeApplicationShutdown');
  }
  onApplicationShutdown() {
    console.log(AppModule.name, 'onApplicationShutdown');
  }
}
