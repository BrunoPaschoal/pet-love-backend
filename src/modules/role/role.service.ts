import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from './entities/role.entity';
import { CreateRoleDto } from './dtos/create-role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
  ) {}

  async findAllRoles(): Promise<RoleEntity[]> {
    return await this.roleRepository.find();
  }

  async createRole(role: CreateRoleDto): Promise<RoleEntity> {
    const isRoleExist = await this.roleRepository.findOne({
      where: { name: role.name },
    });

    if (isRoleExist) {
      throw new HttpException('Role already exists', HttpStatus.BAD_REQUEST);
    }

    const roleSaved = await this.roleRepository.save(role);
    return roleSaved;
  }

  async deleteRole(roleId: string) {
    const role = await this.roleRepository.findOne({
      where: { id: roleId },
    });

    if (!role) throw new HttpException('Role not found', HttpStatus.NOT_FOUND);

    await this.roleRepository.remove(role);
  }
}
