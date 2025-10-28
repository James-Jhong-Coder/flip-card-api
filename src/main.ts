import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://192.168.66.21:5173', 'http://10.1.201.77:5173', 'http://192.168.66.21:5174'],
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
