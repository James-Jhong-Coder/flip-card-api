import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from '@/types/user';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const user = await this.userService.create(registerDto);
    if (!user) {
      return null;
    }
    return { id: user.id, email: user.email, name: user.name };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      return null;
    }
    const isUserValid = await bcrypt.compare(password, user.password_hash);
    if (!isUserValid) {
      return null;
    }
    return { id: user.id, email: user.email, name: user.name };
  }

  async login(user: { id: string; email: string }) {
    const payload = { sub: user.id, email: user.email };
    const userData = await this.userService.findById(Number(user.id));
    return {
      token: await this.jwtService.signAsync(payload),
      email: userData?.email,
      name: userData?.name,
    };
  }
}
