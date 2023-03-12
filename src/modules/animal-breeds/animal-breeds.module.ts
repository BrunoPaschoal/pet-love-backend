import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimalBreedsController } from './animal-breeds.controller';
import { AnimalBreedsService } from './animal-breeds.service';
import { AnimalBreedsEntity } from './entities/animal-breeds.entity';
import { UsersModule } from './../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([AnimalBreedsEntity]), UsersModule],
  controllers: [AnimalBreedsController],
  providers: [AnimalBreedsService],
  exports: [AnimalBreedsService],
})
export class AnimalBreedsModule {}
