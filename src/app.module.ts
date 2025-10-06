import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookController } from './features/book/book.controller';
import { BookModule } from './features/book/book.module';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [BookModule],
  controllers: [AppController, BookController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useFactory: () => {
        return new ValidationPipe({ whitelist: false });
      },
    },
  ],
})
export class AppModule {}
