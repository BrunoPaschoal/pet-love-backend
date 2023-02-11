import { Controller, Get, UseGuards, Post, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AnimalBreedsService } from './animal-breeds.service';
import { PopulateCatBreedsBaseDto } from './dto/populate-cat-breeds-base.dto';
import { PopulateDogBreedsBaseDto } from './dto/populate-dog-breeds-base.dto';
import { DogBreedsEntity } from './entities/dog-breeds.entity';

@Controller('animal-breeds')
@UseGuards(AuthGuard('jwt'))
export class AnimalBreedsController {
  constructor(private readonly animalBreedsService: AnimalBreedsService) {}

  //DOGS RESOURCES
  @Get('dog-breeds')
  async findDogBreeds(): Promise<DogBreedsEntity[]> {
    return this.animalBreedsService.findDogBreeds();
  }

  @Post('dog-breeds')
  async populateDogBreedsBase(@Body() dogBreedsList: PopulateDogBreedsBaseDto) {
    return this.animalBreedsService.populateDogBreedsBase(dogBreedsList);
  }

  //CATS RESOURCES
  @Get('cat-breeds')
  async findCatBreeds(): Promise<DogBreedsEntity[]> {
    return this.animalBreedsService.findCatBreeds();
  }

  @Post('cat-breeds')
  async populatecatBreedsBase(@Body() catBreedsList: PopulateCatBreedsBaseDto) {
    return this.animalBreedsService.populateCatBreedsBase(catBreedsList);
  }
}
