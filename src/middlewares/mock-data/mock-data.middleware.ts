import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class MockDataMiddleware implements NestMiddleware {
  use(req: any, res: any, next: NextFunction) {
    req.role = 'staff';
    req.user = {
      name: 'James',
    };
    next();
  }
}
