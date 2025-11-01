import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // app.enableCors({
  // origin: true,
  // methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  // allowedHeaders: ['Content-Type', 'Authorization'],
  // origin: [
  //   'http://192.168.66.21:5173',
  //   'http://10.1.201.77:5173',
  //   'http://192.168.66.21:5174',
  //   'https://flip-card-ui.vercel.app',
  // ],
  // });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
