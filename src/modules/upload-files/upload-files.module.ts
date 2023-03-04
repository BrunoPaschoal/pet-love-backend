import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { UploadFilesController } from './upload-files.controller';
import { UploadFilesService } from './upload-files.service';
import { PetDonationImageEntity } from './entities/pet-donation-images.entity';
import { PetsEntity } from './../pets/entities/pets.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, PetDonationImageEntity, PetsEntity]),
    ConfigModule.forRoot(),
  ],
  controllers: [UploadFilesController],
  providers: [UploadFilesService],
  exports: [UploadFilesService],
})
export class UploadFilesModule {}
