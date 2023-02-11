import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimalBreedsController } from './animal-breeds.controller';
import { AnimalBreedsService } from './animal-breeds.service';
import { DogBreedsEntity } from './entities/dog-breeds.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DogBreedsEntity])],
  controllers: [AnimalBreedsController],
  providers: [AnimalBreedsService],
})
export class AnimalBreedsModule {}
