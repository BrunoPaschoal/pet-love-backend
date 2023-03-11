import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { PopulateCitiesDatabaseDto } from './dtos/populate-cities.dto';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get('/by-similar-name/:name?')
  async findAnimalBreedsWithSilimarNames(@Param('name') cityName = '') {
    return this.citiesService.findCitiesWithSilimarNames(cityName);
  }

  @Post()
  async createRole(@Body() cities: PopulateCitiesDatabaseDto[]) {
    return await this.citiesService.populateCitiesDatabase(cities);
  }
}
