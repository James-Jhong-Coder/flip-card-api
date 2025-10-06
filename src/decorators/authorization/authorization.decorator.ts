import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { Roles } from '../roles/roles.decorator';
import { RoleGuard } from 'src/guards/role/role.guard';

export const Authorization = (...args: string[]) =>
  applyDecorators(Roles(...args), UseGuards(RoleGuard));
