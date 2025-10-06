import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessageModule } from './modules/message/message.module';

@Module({
  imports: [MessageModule],
  controllers: [AppController],
  providers: [
    {
      provide: AppService,
      useClass: AppService,
    },
    {
      provide: 'AUTHOR',
      useValue: 'James',
    },
    {
      provide: 'AUTHOR_MESSAGE',
      inject: [AppService],
      useFactory: (appService: AppService) => {
        const hello = appService.getHello();
        return `James say ${hello}`;
      },
    },
    {
      provide: 'ALIAS_APP_SERVICE',
      useExisting: AppService,
    },
  ],
})
export class AppModule {}
