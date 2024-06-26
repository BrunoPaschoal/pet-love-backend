import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetsController } from './pets.controller';
import { PetsService } from './pets.service';
import { PetsEntity } from 'src/modules/pets/entities/pets.entity';
import { UsersModule } from '../users/users.module';
import { AddressModule } from '../address/address.module';
import { PetPersonalityEntity } from './entities/pets-personality.entity';
import { PersonalityEntity } from '../personality/entities/personality.entity';
import { AnimalBreedsModule } from './../animal-breeds/animal-breeds.module';
import { UploadFilesModule } from './../upload-files/upload-files.module';
import { FavoritePetEntity } from '../favorite-pets/entities/favorite-pet.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PetsEntity,
      PetPersonalityEntity,
      PersonalityEntity,
      FavoritePetEntity,
    ]),
    UsersModule,
    AddressModule,
    AnimalBreedsModule,
    forwardRef(() => UploadFilesModule),
  ],
  controllers: [PetsController],
  providers: [PetsService],
  exports: [PetsService],
})
export class PetsModule {}
