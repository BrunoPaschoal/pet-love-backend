import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimalBreedsController } from './animal-breeds.controller';
import { AnimalBreedsService } from './animal-breeds.service';
import { AnimalBreedsEntity } from './entities/animal-breeds.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AnimalBreedsEntity])],
  controllers: [AnimalBreedsController],
  providers: [AnimalBreedsService],
})
export class AnimalBreedsModule {}
