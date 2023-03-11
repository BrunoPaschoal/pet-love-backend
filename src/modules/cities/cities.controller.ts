import { Body, Controller, Post } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { PopulateCitiesDatabaseDto } from './dtos/populate-cities.dto';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Post()
  async createRole(@Body() cities: PopulateCitiesDatabaseDto[]) {
    return await this.citiesService.populateCitiesDatabase(cities);
  }
}
