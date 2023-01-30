import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';
import { UploadFilesController } from './upload-files.controller';
import { UploadFilesService } from './upload-files.service';
import { PetsModule } from './../pets/pets.module';
import { PetDonationImageEntity } from './entities/pet-donation-images.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, PetDonationImageEntity]),
    ConfigModule.forRoot(),
    UsersModule,
    PetsModule,
  ],
  controllers: [UploadFilesController],
  providers: [UploadFilesService],
})
export class UploadFilesModule {}
