import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    console.log('path', req.path);
    console.log('query', req.query);
    console.log('params', req.params);
    console.log('body', req.body);

    next();
  }
}
