import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PopulateCatBreedsBaseDto } from './dto/populate-cat-breeds-base.dto';
import { PopulateDogBreedsBaseDto } from './dto/populate-dog-breeds-base.dto';
import { CatBreedsEntity } from './entities/cat-breeds.entity';
import { DogBreedsEntity } from './entities/dog-breeds.entity';

@Injectable()
export class AnimalBreedsService {
  constructor(
    @InjectRepository(DogBreedsEntity)
    private dogBreedsEntityRepository: Repository<DogBreedsEntity>,
    @InjectRepository(CatBreedsEntity)
    private catBreedsEntityRepository: Repository<CatBreedsEntity>,
  ) {}

  //DOGS RESOURCES
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

  //CATS RESOURCES
  async findCatBreeds(): Promise<CatBreedsEntity[]> {
    return await this.catBreedsEntityRepository.find();
  }

  async populateCatBreedsBase({ catBreeds }: PopulateCatBreedsBaseDto) {
    const rejectedBreeds: string[] = [];
    const insertedSuccessfully: string[] = [];
    for (let i = 0; i < catBreeds.length; i++) {
      const isBreedExist = await this.catBreedsEntityRepository.findOne({
        where: { breedName: catBreeds[i] },
      });

      if (!isBreedExist) {
        await this.catBreedsEntityRepository.save({ breedName: catBreeds[i] });
        insertedSuccessfully.push(catBreeds[i]);
      }

      if (isBreedExist) {
        rejectedBreeds.push(catBreeds[i]);
      }
    }
    return {
      breedsThatAlreadyExist: rejectedBreeds,
      insertedSuccessfully: insertedSuccessfully,
    };
  }
}
