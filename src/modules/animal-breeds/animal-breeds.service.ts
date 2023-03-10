import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PopulateAnimalBreedsBaseDto } from './dto/populate-animal-breeds-base.dto';
import { AnimalBreedsEntity } from './entities/animal-breeds.entity';
import { AnimalBreedsTypeDto } from './dto/animal-breeds-type.dto';
import { FindAnimalBreedsDto } from './dto/find-animal-breeds.dto';

@Injectable()
export class AnimalBreedsService {
  constructor(
    @InjectRepository(AnimalBreedsEntity)
    private animalBreedsEntityRepository: Repository<AnimalBreedsEntity>,
  ) {}

  async findAnimalBreeds(): Promise<AnimalBreedsEntity[]> {
    return await this.animalBreedsEntityRepository
      .createQueryBuilder('animalBreeds')
      .orderBy('animalBreeds.breedName', 'ASC')
      .getMany();
  }

  async findAnimalBreedsByIdOrFail(
    breedId: string,
  ): Promise<AnimalBreedsEntity> {
    const breed = await this.animalBreedsEntityRepository.findOne({
      where: { id: breedId },
    });

    if (!breed) {
      throw new HttpException('Raça não encontrada!', HttpStatus.NOT_FOUND);
    }

    return breed;
  }

  async findAnimalBreedsWithSilimarNames(
    animalBreedsDto: FindAnimalBreedsDto,
  ): Promise<AnimalBreedsEntity[]> {
    const animalBreeds = await this.animalBreedsEntityRepository
      .createQueryBuilder('animalBreeds')
      .where('animalBreeds.breedName ILIKE :name', {
        name: `%${animalBreedsDto.breedName}%`,
      })
      .andWhere('animalBreeds.petType IN (:...types)', {
        types: [animalBreedsDto.petType, 'BOTH'],
      })
      .getMany();

    return animalBreeds;
  }

  async populateAnimalBreedsBase({
    animalBreeds,
  }: PopulateAnimalBreedsBaseDto) {
    const rejectedBreeds: AnimalBreedsTypeDto[] = [];
    const insertedSuccessfully: AnimalBreedsTypeDto[] = [];

    for (let i = 0; i < animalBreeds.length; i++) {
      const isBreedExist = await this.animalBreedsEntityRepository.findOne({
        where: { breedName: animalBreeds[i].breedName },
      });

      if (!isBreedExist) {
        await this.animalBreedsEntityRepository.save({
          breedName: animalBreeds[i].breedName,
          petType: animalBreeds[i].petType,
        });
        insertedSuccessfully.push(animalBreeds[i]);
      }

      if (isBreedExist) {
        rejectedBreeds.push(animalBreeds[i]);
      }
    }
    return {
      breedsThatAlreadyExist: rejectedBreeds,
      insertedSuccessfully: insertedSuccessfully,
    };
  }
}
