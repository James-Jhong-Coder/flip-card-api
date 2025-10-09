import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Roles } from './decorators/roles/roles.decorator';
import { RoleGuard } from './guards/role/role.guard';
import { User } from './decorators/user/user.decorator';
import { Authorization } from './decorators/authorization/authorization.decorator';
import { Other } from './decorators/other/other.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(RoleGuard)
  @Roles('admin', 'staff')
  @Other(['other1', 'other2'])
  @Get()
  getHello(@User('name') name: string): string {
    return name;
  }

  @Authorization('admin', 'staff')
  @Get('test')
  getTest(@User('name') name: string): string {
    return name;
  }
}
