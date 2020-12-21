import { ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import * as jwt from 'jsonwebtoken';
import Jwt from 'jsonwebtoken';
import { OperationLogService } from '@/modules/operation-log/operation-log.service';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector, @Inject(OperationLogService) private service: OperationLogService) {
    super();
  }

  canActivate(context: ExecutionContext) {

    const req = context.switchToHttp().getRequest();
    if (!req.headers.authorization) {
      return false;
    }

    // 通过jwt解析获得user
    // const user = Jwt.decode(req.headers.authorization.replace('Bearer ', ''));
    const user = {
      username: 'admin',
    };
    if (!user) {
      return false;
    }
    req['user'] = user;
    this.service.operator = user['username'];
    return true;
  }
}
