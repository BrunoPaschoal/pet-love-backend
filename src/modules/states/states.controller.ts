import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PopulateStatesDatabaseDto } from './dtos/populate-states.dto';
import { StatesService } from './states.service';

@Controller('states')
export class StatesController {
  constructor(private readonly statessService: StatesService) {}

  @Get('/by-similar-acronym/:acronym?')
  async findAnimalBreedsWithSilimarNames(@Param('acronym') stateAcronym = '') {
    return this.statessService.findStatesWithSilimarAcronym(stateAcronym);
  }

  @Post()
  async populateStatesDatabase(@Body() states: PopulateStatesDatabaseDto[]) {
    return await this.statessService.populateStatesDatabase(states);
  }
}
