import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async register(
    @Body(new ValidationPipe({ whitelist: true, transform: true }))
    dto: RegisterDto,
  ) {
    return this.authService.register(dto);
  }

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body(new ValidationPipe({ whitelist: true, transform: true }))
    _dto: LoginDto,
    @Request() req: any,
  ) {
    return this.authService.login(req.user);
  }
}
