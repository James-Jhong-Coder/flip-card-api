import { Module, Provider } from '@nestjs/common';

const customMessage: Provider = {
  provide: 'CUSTOM_MESSAGE',
  useValue: 'message!',
};

@Module({
  providers: [customMessage],
  exports: [customMessage],
})
export class MessageModule {}
