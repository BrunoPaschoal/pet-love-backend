import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetsController } from './pets.controller';
import { PetsService } from './pets.service';
import { PetsEntity } from 'src/modules/pets/entities/pets.entity';
import { UsersModule } from '../users/users.module';
import { AddressModule } from '../address/address.module';
import { PetPersonalityEntity } from './entities/pets-personality.entity';
import { PersonalityEntity } from '../personality/entities/personality.entity';
import { AnimalBreedsModule } from './../animal-breeds/animal-breeds.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PetsEntity,
      PetPersonalityEntity,
      PersonalityEntity,
    ]),
    UsersModule,
    AddressModule,
    AnimalBreedsModule,
  ],
  controllers: [PetsController],
  providers: [PetsService],
  exports: [PetsService],
})
export class PetsModule {}
