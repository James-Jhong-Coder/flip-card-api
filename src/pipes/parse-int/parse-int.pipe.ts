import {
  ArgumentMetadata,
  Injectable,
  NotAcceptableException,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const _integer = parseInt(value, 10);
    if (isNaN(_integer)) {
      throw new NotAcceptableException('不是數字');
    }
    return _integer;
  }
}
