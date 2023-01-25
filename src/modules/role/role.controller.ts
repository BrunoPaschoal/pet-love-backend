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
import { RolesGuard } from './../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('role')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  @Roles('MASTER')
  async findAll(): Promise<RoleEntity[]> {
    return this.roleService.findAllRoles();
  }

  @Post()
  @Roles('MASTER')
  @Validate(CreateRoleDto)
  async createRole(@Body() role: CreateRoleDto): Promise<RoleEntity> {
    return await this.roleService.createRole(role);
  }

  @Delete(':id')
  @Roles('MASTER')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteRole(@Param('id') id: string) {
    return this.roleService.deleteRole(id);
  }
}
