import { Module } from '@nestjs/common';
import { FavoritePetsController } from './favorite-pets.controller';
import { FavoritePetsService } from './favorite-pets.service';
import { UsersModule } from './../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritePetEntity } from './entities/favorite-pet.entity';
import { PetsModule } from '../pets/pets.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([FavoritePetEntity]),
    UsersModule,
    PetsModule,
  ],
  controllers: [FavoritePetsController],
  providers: [FavoritePetsService],
})
export class FavoritePetsModule {}
