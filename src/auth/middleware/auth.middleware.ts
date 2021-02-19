import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor( private readonly jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(401).json({ message: 'You should login first' })
    }
    const result = await this.jwtService.verifyAsync(token);
    if (!result) {
      res.status(401).json({ message: 'Unauthorized' });
    } else {
      req.body.authedUser = result.user;
      next()
    }
  }
}
