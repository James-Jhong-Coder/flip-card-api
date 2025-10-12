import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private users: UsersService,
    private jwt: JwtService,
  ) {}

  async validateUser(email: string, passport: string) {
    const user = await this.users.findByEmail(email);
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
