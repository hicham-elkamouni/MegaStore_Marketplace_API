import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { JwtGuard } from './JwtGuard.guard';
import { RolesGuard } from './RolesGuard.guard';

export function Allowed(roles: string[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(JwtGuard, RolesGuard),
  );
}
