import { Controller, Get, Inject, Optional } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('AUTHOR') private readonly author: string,
    @Inject('AUTHOR_MESSAGE') private readonly authorMessage: string,
    @Inject('ALIAS_APP_SERVICE') private readonly aliasAppService: AppService,
    @Inject('CUSTOM_MESSAGE') private readonly customMessage: string,
    @Optional() @Inject('NO_EXIST') private readonly noExist: unknown,
  ) {
    console.log(
      'appService === aliasAppService',
      this.appService === this.aliasAppService,
    );
    console.log('AUTHOR = ', this.author);
    console.log('AUTHOR_MESSAGE = ', this.authorMessage);
    console.log('CUSTOM_MESSAGE = ', this.customMessage);
    console.log('NO_EXIST = ', this.noExist);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
