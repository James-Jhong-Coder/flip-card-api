import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const method = req.method.toUpperCase();
    const resource = req.originalUrl;
    const timestamp = new Date().toISOString();
    console.log(`${method} - ${resource} - ${timestamp}`);
    next();
  }
}
