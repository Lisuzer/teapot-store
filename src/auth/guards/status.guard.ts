import {
    ExecutionContext,
    Injectable,
    CanActivate,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { STATUSES_KEY } from '../decorators/status.decorator';
  import { UserStatus } from '../schemas/user-status.enum';
  
  @Injectable()
  export class StatusesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
  
    canActivate(context: ExecutionContext): boolean | Promise<boolean> {
      const requiredStatuses = this.reflector.getAllAndOverride<UserStatus[]>(
        STATUSES_KEY,
        [context.getHandler(), context.getClass()],
      );
  
      if (!requiredStatuses) {
        return true;
      }
  
      const { user } = context.switchToHttp().getRequest();
      return requiredStatuses.some((status) => user.status.includes(status));
    }
  }