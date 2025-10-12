import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwt: JwtService,
  ) {}

  async register(data: { email: string; password: string; name?: string }) {
    const user = await this.userService.create(data);
    return { id: user.id, email: user.email, name: user.name };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) return null;
    const ok = await user.comparePassword(password);
    if (!ok) return null;
    return { id: user.id, email: user.email, name: user.name };
  }

  async login(user: { id: string; email: string }) {
    const payload = { sub: user.id, email: user.email };
    return { access_token: await this.jwt.signAsync(payload) };
  }
}
