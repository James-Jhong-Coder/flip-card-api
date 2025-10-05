import {
  Injectable,
  OnModuleInit,
  OnApplicationBootstrap,
  OnModuleDestroy,
  BeforeApplicationShutdown,
  OnApplicationShutdown,
} from '@nestjs/common';

@Injectable()
export class TodoService
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  onModuleInit() {
    console.log(TodoService.name, 'OnModuleInit');
  }

  onApplicationBootstrap() {
    console.log(TodoService.name, 'OnApplicationBootstrap');
  }

  onModuleDestroy() {
    console.log(TodoService.name, 'OnModuleDestroy');
  }

  async beforeApplicationShutdown(signal?: string) {
    console.log(TodoService.name, 'beforeApplicationShutdown', signal);
    // 這裡可做資源清理 / 關閉連線，例如：
    // await this.db?.close();
  }

  onApplicationShutdown(signal?: string) {
    console.log(TodoService.name, 'onApplicationShutdown', signal);
  }
}
