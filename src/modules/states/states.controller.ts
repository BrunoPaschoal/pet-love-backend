import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { PopulateStatesDatabaseDto } from './dtos/populate-states.dto';
import { StatesService } from './states.service';

@Controller('states')
@UseGuards(AuthGuard('jwt'))
export class StatesController {
  constructor(private readonly statessService: StatesService) {}

  @Get('/by-similar-acronym/:acronym?')
  async findAnimalBreedsWithSilimarNames(@Param('acronym') stateAcronym = '') {
    return this.statessService.findStatesWithSilimarAcronym(stateAcronym);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles('MASTER')
  async populateStatesDatabase(@Body() states: PopulateStatesDatabaseDto[]) {
    return await this.statessService.populateStatesDatabase(states);
  }
}
