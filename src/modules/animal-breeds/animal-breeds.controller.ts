import { Controller, Get, UseGuards, Post, Body, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AnimalBreedsService } from './animal-breeds.service';
import { PopulateAnimalBreedsBaseDto } from './dto/populate-animal-breeds-base.dto';
import { FindAnimalBreedsDto } from './dto//find-animal-breeds.dto';
import { AnimalBreedsEntity } from './entities/animal-breeds.entity';

@Controller('animal-breeds')
@UseGuards(AuthGuard('jwt'))
export class AnimalBreedsController {
  constructor(private readonly animalBreedsService: AnimalBreedsService) {}

  @Get('/all')
  async findAnimalBreeds(): Promise<AnimalBreedsEntity[]> {
    return this.animalBreedsService.findAnimalBreeds();
  }

  @Get('/by-similar-name')
  async findAnimalBreedsWithSilimarNames(
    @Query() findAnimalBreedsDto: FindAnimalBreedsDto,
  ) {
    return this.animalBreedsService.findAnimalBreedsWithSilimarNames(
      findAnimalBreedsDto,
    );
  }

  @Post()
  async populateAnimalBreedsBase(
    @Body() animalBreedsList: PopulateAnimalBreedsBaseDto,
  ) {
    return this.animalBreedsService.populateAnimalBreedsBase(animalBreedsList);
  }
}
