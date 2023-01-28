import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { RoleEntity } from 'src/modules/role/entities/role.entity';
import { UserEntity } from 'src/modules/users/entities/user.entitiy';
import { AddressEntity } from 'src/modules/address/entities/address.entity';
import { PetsEntity } from './../modules/pets/entities/pets.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.TYPEORM_CONNECTION,
      host: process.env.TYPEORM_HOST,
      port: process.env.TYPEORM_PORT,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [UserEntity, RoleEntity, AddressEntity, PetsEntity],
      synchronize: true,
    } as TypeOrmModuleOptions),
  ],
})
export class DatabaseModule {}
