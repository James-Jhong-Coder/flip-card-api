import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TodoModule } from './features/todo/todo.module';
import serverConfig from './configs/server.config';
import databaseConfig from './configs/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['dev.local.env', 'dev.env'],
      load: [serverConfig, databaseConfig],
      expandVariables: true,
    }),
    TodoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {}
  onModuleInit(): void {
    const { host, password } = this.configService.get('database');
    const domain = this.configService.get('APP_DOMAIN');
    const redirect = this.configService.get('APP_REDIRECT_URL');
    console.log(host, password, domain, redirect);
  }
}
