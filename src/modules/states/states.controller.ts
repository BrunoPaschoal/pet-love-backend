import { Body, Controller, Post } from '@nestjs/common';
import { PopulateStatesDatabaseDto } from './dtos/populate-states.dto';
import { StatesService } from './states.service';

@Controller('states')
export class StatesController {
  constructor(private readonly statessService: StatesService) {}

  @Post()
  async createRole(@Body() states: PopulateStatesDatabaseDto[]) {
    return await this.statessService.populateStatesDatabase(states);
  }
}
