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
    return await this.dogBreedsEntityRepository
      .createQueryBuilder('dogBreeds')
      .orderBy('dogBreeds.breedName', 'ASC')
      .getMany();
  }

  async findDogBreedsWithSilimarNames(
    breedName: string,
  ): Promise<DogBreedsEntity[]> {
    const dogBreeds = await this.dogBreedsEntityRepository
      .createQueryBuilder('dogBreeds')
      .where('dogBreeds.breedName LIKE :name', { name: `%${breedName}%` })
      .getMany();

    return dogBreeds;
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
    return await this.catBreedsEntityRepository
      .createQueryBuilder('catBreeds')
      .orderBy('catBreeds.breedName', 'ASC')
      .getMany();
  }

  async findCatBreedsWithSilimarNames(
    breedName: string,
  ): Promise<CatBreedsEntity[]> {
    const catBreeds = await this.catBreedsEntityRepository
      .createQueryBuilder('catBreeds')
      .where('catBreeds.breedName LIKE :name', { name: `%${breedName}%` })
      .getMany();

    return catBreeds;
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
