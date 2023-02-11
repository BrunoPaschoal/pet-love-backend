import { Controller, Get, UseGuards, Post, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AnimalBreedsService } from './animal-breeds.service';
import { PopulateDogBreedsBaseDto } from './dto/populate-dog-breeds-base.dto';
import { DogBreedsEntity } from './entities/dog-breeds.entity';

@Controller('animal-breeds')
@UseGuards(AuthGuard('jwt'))
export class AnimalBreedsController {
  constructor(private readonly animalBreedsService: AnimalBreedsService) {}

  @Get('dog-breeds')
  async findDogBreeds(): Promise<DogBreedsEntity[]> {
    return this.animalBreedsService.findDogBreeds();
  }

  @Post('dog-breeds')
  async populateDogBreedsBase(@Body() dogBreedsList: PopulateDogBreedsBaseDto) {
    return this.animalBreedsService.populateDogBreedsBase(dogBreedsList);
  }
}
