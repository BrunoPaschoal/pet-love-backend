import { Controller, Get, HttpStatus } from '@nestjs/common';
import {
  Body,
  Delete,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common/decorators';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserEntity } from './database/user.entitiy';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Validate } from 'class-validator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<UserEntity[]> {
    return await this.usersService.findAllUsers();
  }

  @Post()
  @Validate(CreateUserDto)
  async create(@Body() user: CreateUserDto): Promise<UserEntity> {
    return await this.usersService.createUser(user);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findUserOrFail(id);
  }

  @Put(':id')
  async updateOne(@Param('id') id: string, @Body() payload: UpdateUserDto) {
    return await this.usersService.updateUser(id, payload);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOne(@Param('id') id: string) {
    return await this.usersService.deleteUser(id);
  }
}
