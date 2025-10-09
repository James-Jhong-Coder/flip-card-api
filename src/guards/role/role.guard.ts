import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { Other } from 'src/decorators/other/other.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const { role } = request as any;
    const handler = context.getHandler();
    const whiteList = this.reflector.get<string[]>('roles', handler);

    // others
    const others = this.reflector.getAllAndOverride<string[]>(Other, [
      context.getHandler(),
      context.getClass(),
    ]);

    console.log(others);

    return whiteList.includes(role);
  }
}
