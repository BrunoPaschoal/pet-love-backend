import { Controller } from '@nestjs/common';
import { Body, Post } from '@nestjs/common/decorators';
import { UsersService } from './users.service';
import { UserDto } from './dtos/user.dto';
import { UserEntity } from './database/user.entitiy';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() user: UserDto): Promise<UserEntity> {
    return await this.usersService.createUser(user);
  }
}
