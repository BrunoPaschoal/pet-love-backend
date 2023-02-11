import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PopulateDogBreedsBaseDto } from './dto/populate-dog-breeds-base.dto';
import { DogBreedsEntity } from './entities/dog-breeds.entity';

@Injectable()
export class AnimalBreedsService {
  constructor(
    @InjectRepository(DogBreedsEntity)
    private dogBreedsEntityRepository: Repository<DogBreedsEntity>,
  ) {}

  async findDogBreeds(): Promise<DogBreedsEntity[]> {
    return await this.dogBreedsEntityRepository.find();
  }

  async populateDogBreedsBase({ dogBreeds }: PopulateDogBreedsBaseDto) {
    const rejectedBreeds: string[] = [];
    const insertedSuccessfully: string[] = [];
    for (let i = 0; i < dogBreeds.length; i++) {
      const isBreedExist = await this.dogBreedsEntityRepository.findOne({
        where: { breedName: dogBreeds[i] },
      });

      if (!isBreedExist) {
        await this.dogBreedsEntityRepository.save({ breedName: dogBreeds[i] });
        insertedSuccessfully.push(dogBreeds[i]);
      }

      if (isBreedExist) {
        rejectedBreeds.push(dogBreeds[i]);
      }
    }
    return {
      breedsThatAlreadyExist: rejectedBreeds,
      insertedSuccessfully: insertedSuccessfully,
    };
  }
}
