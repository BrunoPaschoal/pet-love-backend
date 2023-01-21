import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './interfaces/user.interface';
import { UserEntity } from './database/user.entitiy';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createUser(user: User): Promise<UserEntity> {
    const passwordEncrypted = await hash(user.password, 10);
    user.password = passwordEncrypted;

    const userSaved = await this.userRepository.save(user);

    delete userSaved.password;

    return userSaved;
  }
}
