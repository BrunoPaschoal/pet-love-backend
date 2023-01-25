import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dtos/create-role.dto';
import { Validate } from 'class-validator';
import { RoleEntity } from './entities/role.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('role')
@UseGuards(AuthGuard('jwt'))
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  async findAll(): Promise<RoleEntity[]> {
    return this.roleService.findAllRoles();
  }

  @Post()
  @Validate(CreateRoleDto)
  async createRole(@Body() role: CreateRoleDto): Promise<RoleEntity> {
    return await this.roleService.createRole(role);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteRole(@Param('id') id: string) {
    return this.roleService.deleteRole(id);
  }
}
