import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

interface CreateUserInput {
  email: string;
  password: string;
  name?: string;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async create(data: CreateUserInput) {
    const exists = await this.userRepo.exists({ where: { email: data.email } });
    if (exists) throw new ConflictException('Email already registered');

    const user = this.userRepo.create({
      email: data.email,
      name: data.name,
    });
    await user.setPassword(data.password);
    return this.userRepo.save(user);
  }

  findByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }

  async findById(id: string) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
