import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PopulateCitiesDatabaseDto } from './dtos/populate-cities.dto';
import { CitiesEntity } from './entities/cities.entity';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(CitiesEntity)
    private citiesRepository: Repository<CitiesEntity>,
  ) {}

  async populateCitiesDatabase(cities: PopulateCitiesDatabaseDto[]) {
    for (let i = 0; i < cities.length; i++) {
      const city = cities[i];
      const newCity = this.citiesRepository.create({
        city: city.city,
        ibge: city.ibge,
      });

      await this.citiesRepository.save(newCity);
    }
  }
}
