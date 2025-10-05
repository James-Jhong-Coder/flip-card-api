import { DynamicModule, Module } from '@nestjs/common';
import { HelloService } from './hello.service';

@Module({})
export class HelloModule {
  public static forRoot(input: string): DynamicModule {
    return {
      global: true,
      module: HelloModule,
      providers: [
        HelloService,
        {
          provide: 'INPUT',
          useValue: input,
        },
      ],
      exports: [HelloService],
    };
  }
}
