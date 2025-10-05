import {
  Controller,
  Get,
  OnModuleInit,
  OnApplicationBootstrap,
  OnModuleDestroy,
  BeforeApplicationShutdown,
  OnApplicationShutdown,
} from '@nestjs/common';

@Controller()
export class AppController
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  onModuleInit() {
    console.log(AppController.name, 'OnModuleInit');
  }

  onApplicationBootstrap() {
    console.log(AppController.name, 'OnApplicationBootstrap');
  }

  onModuleDestroy() {
    console.log(AppController.name, 'OnModuleDestroy');
  }

  beforeApplicationShutdown(signal?: string) {
    console.log(AppController.name, 'beforeApplicationShutdown', signal);
  }

  onApplicationShutdown(signal?: string) {
    console.log(AppController.name, 'onApplicationShutdown', signal);
  }

  @Get()
  getHello(): string {
    return 'Hello World!';
  }
}
