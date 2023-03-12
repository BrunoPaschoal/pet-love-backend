import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CitiesService } from './cities.service';
import { PopulateCitiesDatabaseDto } from './dtos/populate-cities.dto';

@Controller('cities')
@UseGuards(AuthGuard('jwt'))
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get('/by-similar-name/:name?')
  async findAnimalBreedsWithSilimarNames(@Param('name') cityName = '') {
    return this.citiesService.findCitiesWithSilimarNames(cityName);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles('MASTER')
  async createRole(@Body() cities: PopulateCitiesDatabaseDto[]) {
    return await this.citiesService.populateCitiesDatabase(cities);
  }
}
