import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PopulateStatesDatabaseDto } from './dtos/populate-states.dto';
import { StatesEntity } from './entities/states.entity';

@Injectable()
export class StatesService {
  constructor(
    @InjectRepository(StatesEntity)
    private statesRepository: Repository<StatesEntity>,
  ) {}

  async populateStatesDatabase(states: PopulateStatesDatabaseDto[]) {
    for (let i = 0; i < states.length; i++) {
      const state = states[i];
      const newState = this.statesRepository.create({
        name: state.name,
        ibge: state.ibge,
        acronym: state.acronym,
      });

      await this.statesRepository.save(newState);
    }
  }
}
