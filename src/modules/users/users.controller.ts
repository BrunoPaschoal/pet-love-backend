import { Controller, Get, HttpStatus, UseGuards } from '@nestjs/common';
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
import { UserEntity } from './entities/user.entity';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Validate } from 'class-validator';
import { AuthGuard } from '@nestjs/passport';
import { UserId } from '../auth/decorators/userId.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(): Promise<UserEntity[]> {
    return await this.usersService.findAllUsers();
  }

  @Post()
  @Validate(CreateUserDto)
  async create(@Body() user: CreateUserDto): Promise<UserEntity> {
    return await this.usersService.createUser(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findUserByIdOrFail(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put()
  async updateOne(
    @UserId() currentUserId: string,
    @Body() payload: UpdateUserDto,
  ) {
    return await this.usersService.updateUser(currentUserId, payload);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOne(@UserId() currentUserId: string) {
    return await this.usersService.deleteUser(currentUserId);
  }
}
