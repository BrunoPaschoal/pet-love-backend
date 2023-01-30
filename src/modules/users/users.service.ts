import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { RoleEntity } from '../role/entities/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  async createUser(user: CreateUserDto): Promise<UserEntity> {
    const isUserAlreadExist = await this.userRepository.findOne({
      where: { email: user.email },
      select: ['id', 'name', 'email', 'phone', 'createdAt'],
    });

    if (isUserAlreadExist) {
      throw new HttpException('User Already exists', HttpStatus.BAD_REQUEST);
    }

    const passwordEncrypted = await hash(user.password, 10);
    user.password = passwordEncrypted;

    const newRole = await this.roleRepository.findOne({
      where: { name: 'USER' },
    });
    const userSaved = this.userRepository.create(user);

    userSaved.role = newRole;
    await this.userRepository.save(userSaved);
    delete userSaved.password;

    return userSaved;
  }

  async findAllUsers(): Promise<UserEntity[]> {
    return await this.userRepository.find({
      select: ['id', 'name', 'email', 'phone', 'role'],
    });
  }

  async findUserByIdOrFail(id: string): Promise<UserEntity> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .where('user.id = :id', { id })
      .select([
        'user.id',
        'user.name',
        'user.email',
        'user.phone',
        'role.id',
        'role.name',
        'user.createdAt',
      ])
      .getOne();

    if (!user) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async findUserByEmailOrFail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async updateUser(id: string, payload: UpdateUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { id },
      select: ['id', 'name', 'email', 'phone', 'createdAt'],
    });

    if (!user) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }

    this.userRepository.merge(user, payload);

    return await this.userRepository.save(user);
  }

  async deleteUser(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }

    await this.userRepository.remove(user);
  }
}
