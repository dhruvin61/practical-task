import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRoles } from '../enums';
import { User } from '@app/common/database/models/user.schema';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const allowedRoles = this.reflector.getAllAndOverride<UserRoles[]>(
      'roles',
      [context.getHandler(), context.getClass()],
    );

    if (!allowedRoles) {
      return true;
    }

    const user = this.getUser(context);

    return user && allowedRoles.some((role) => user.roles?.includes(role));
  }

  protected getUser(ctx: ExecutionContext): User {
    switch (ctx.getType() as string) {
      case 'http':
        return ctx.switchToHttp().getRequest().user;
      default:
        throw new Error(`Invalid context type: ${ctx.getType()}!`);
    }
  }
}
