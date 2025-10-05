import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class HelloService {
  constructor(@Inject('INPUT') private readonly input: string) {}
  public sayHello() {
    return `Hello ${this.input}`;
  }
}
