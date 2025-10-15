import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('profile')
  async getProfile(@Req() req: any) {
    const userId = Number(req.user.id);
    const userData = await this.userService.findById(userId);
    return {
      name: userData?.name,
      email: userData?.email,
    };
  }
}
