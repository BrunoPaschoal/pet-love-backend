import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { RoleEntity } from '../role/entities/role.entity';
import { PetsEntity } from './../pets/entities/pets.entity';
import { UploadFilesService } from './../upload-files/upload-files.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    @InjectRepository(PetsEntity)
    private readonly petsRepository: Repository<PetsEntity>,
    private readonly uploadFileService: UploadFilesService,
  ) {}

  async createUser(user: CreateUserDto): Promise<UserEntity> {
    user.email = user.email.toLowerCase();
    const isUserAlreadExist = await this.userRepository.findOne({
      where: { email: user.email },
      select: ['id', 'name', 'email', 'phone', 'createdAt'],
    });

    if (isUserAlreadExist) {
      throw new HttpException(
        'Poxa, esse email já existe em nossa base de dados! 😯',
        HttpStatus.BAD_REQUEST,
      );
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
    //Adicionar avatar no retorno
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
      where: { email: email.toLowerCase() },
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

    await this.uploadFileService.deleteAvatarFile(id);

    const userPets = await this.petsRepository.find({
      where: { user: { id: id } },
    });

    if (userPets.length > 0) {
      for (let i = 0; i < userPets.length; i++) {
        const pet = userPets[i];
        await this.uploadFileService.deletePetImagesAndRelationship(pet.id);
      }
    }

    await this.userRepository.remove(user);
  }
}
