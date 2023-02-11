import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimalBreedsController } from './animal-breeds.controller';
import { AnimalBreedsService } from './animal-breeds.service';
import { CatBreedsEntity } from './entities/cat-breeds.entity';
import { DogBreedsEntity } from './entities/dog-breeds.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DogBreedsEntity, CatBreedsEntity])],
  controllers: [AnimalBreedsController],
  providers: [AnimalBreedsService],
})
export class AnimalBreedsModule {}
