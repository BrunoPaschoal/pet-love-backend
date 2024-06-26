import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { RoleEntity } from 'src/modules/role/entities/role.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { AddressEntity } from 'src/modules/address/entities/address.entity';
import { PetsEntity } from './../modules/pets/entities/pets.entity';
import { PetDonationImageEntity } from 'src/modules/upload-files/entities/pet-donation-images.entity';
import { FavoritePetEntity } from 'src/modules/favorite-pets/entities/favorite-pet.entity';
import { PersonalityEntity } from 'src/modules/personality/entities/personality.entity';
import { PetPersonalityEntity } from 'src/modules/pets/entities/pets-personality.entity';
import { AnimalBreedsEntity } from 'src/modules/animal-breeds/entities/animal-breeds.entity';
import { CitiesEntity } from 'src/modules/cities/entities/cities.entity';
import { StatesEntity } from 'src/modules/states/entities/states.entity';

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
      entities: [
        UserEntity,
        RoleEntity,
        AddressEntity,
        PetsEntity,
        PetDonationImageEntity,
        FavoritePetEntity,
        PersonalityEntity,
        PetPersonalityEntity,
        AnimalBreedsEntity,
        CitiesEntity,
        StatesEntity,
      ],
      synchronize: true,
    } as TypeOrmModuleOptions),
  ],
})
export class DatabaseModule {}
