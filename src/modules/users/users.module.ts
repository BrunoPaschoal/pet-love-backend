import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';
import { RoleEntity } from '../role/entities/role.entity';
import { PetsEntity } from './../pets/entities/pets.entity';
import { UploadFilesModule } from './../upload-files/upload-files.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, RoleEntity, PetsEntity]),
    UploadFilesModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
