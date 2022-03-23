import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<any> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    const roles = this.reflector.get<[string]>('roles', context.getHandler());
    const payloadRoles = <[string]>request.user?.permissions;

    if (!payloadRoles) return false;
    //check if at least one of the rolse exist
    if (!roles.some((v) => payloadRoles.indexOf(v) !== -1)) return false;

    return true;
  }
}
