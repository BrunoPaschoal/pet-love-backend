import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddPersonalityDto } from './dtos/add-personality.dto';
import { PersonalityEntity } from './entities/personality.entity';

@Injectable()
export class PersonalityService {
  constructor(
    @InjectRepository(PersonalityEntity)
    private personalityRepository: Repository<PersonalityEntity>,
  ) {}

  async findPersonalities(): Promise<PersonalityEntity[]> {
    const personalities = await this.personalityRepository.find({
      select: ['id', 'name'],
    });
    return personalities;
  }

  async addPersonality({ personality }: AddPersonalityDto) {
    const isExist = await this.personalityRepository.findOne({
      where: { name: personality },
    });

    if (isExist) {
      throw new HttpException(
        'A personality with that name already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.personalityRepository.save({ name: personality });
  }
}
