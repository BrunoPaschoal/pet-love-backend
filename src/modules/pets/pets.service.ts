import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePetDonationDto } from './dtos/create-pet-donation.dto';
import { PetsEntity } from 'src/modules/pets/entities/pets.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { AddressService } from './../address/address.service';
import { UpdatePetDonationDto } from './dtos/update-pet-donation.dto';
import { PetPersonalityEntity } from 'src/modules/pets/entities/pets-personality.entity';
import { PersonalityEntity } from '../personality/entities/personality.entity';
import { PersonalityDto } from './dtos/personality.dto';
import { AnimalBreedsService } from '../animal-breeds/animal-breeds.service';
import { FindPetDonationsDto } from './dtos/find-pet-by-distance.dto';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(PetsEntity)
    private petsRepository: Repository<PetsEntity>,
    @InjectRepository(PetPersonalityEntity)
    private petsPersonalityRepository: Repository<PetPersonalityEntity>,
    @InjectRepository(PersonalityEntity)
    private personalityRepository: Repository<PersonalityEntity>,
    private readonly usersService: UsersService,
    private readonly addressService: AddressService,
    private readonly animalBreedService: AnimalBreedsService,
  ) {}

  async findDonationByIdOrFail(donationId: string): Promise<PetsEntity> {
    const petDonation = await this.petsRepository.findOne({
      where: { id: donationId },
    });

    if (!petDonation) {
      throw new HttpException(
        'Anúncio de doação não encontrado!',
        HttpStatus.NOT_FOUND,
      );
    }
    return petDonation;
  }

  async findUserDonations(userId: string, page = 1, perPage = 10) {
    await this.usersService.findUserByIdOrFail(userId);

    const [results, total] = await this.petsRepository
      .createQueryBuilder('pets')
      .leftJoinAndSelect('pets.personality', 'personalities')
      .leftJoinAndSelect('personalities.personality', 'personality')
      .leftJoinAndSelect('pets.breed', 'breed')
      .select([
        'pets',
        'personalities',
        'personality.id',
        'personality.name',
        'breed.id',
        'breed.breedName',
      ])
      .where('pets.user = :userId', { userId })
      .take(perPage)
      .skip((page - 1) * perPage)
      .getManyAndCount();

    const totalPages = Math.ceil(total / perPage);

    const pets = results.map((pet) => ({
      ...pet,
      personality: pet.personality.map((p) => p.personality),
    }));

    return {
      pets,
      page,
      perPage,
      total,
      totalPages,
    };
  }

  async findPetDonations({
    userId,
    page,
    perPage,
    sizeFilter,
    stateFilter,
    cityIbgeCodeFilter,
    sexFilter,
    ageFilter,
    ageTypeFilter,
  }: FindPetDonationsDto) {
    const currentPage = +page;
    const perPageAmount = +perPage;
    const ageFilterParam = +ageFilter;

    // const latitude = -23.522819996;
    // const longitude = -46.1878036819;

    await this.usersService.findUserByIdOrFail(userId);

    const queryBuilder = this.petsRepository
      .createQueryBuilder('pets')
      .leftJoinAndSelect('pets.address', 'address')
      .leftJoinAndSelect('pets.personality', 'personalities')
      .leftJoinAndSelect('personalities.personality', 'personality')
      .leftJoinAndSelect('pets.breed', 'breed')
      .select([
        'pets',
        'personalities',
        'address.city',
        'address.state',
        'personality.id',
        'personality.name',
        'breed.id',
        'breed.breedName',
      ])
      .where('pets.user <> :userId', { userId });
    if (sizeFilter)
      queryBuilder.andWhere('pets.size = :sizeFilter', { sizeFilter });
    if (sexFilter)
      queryBuilder.andWhere('pets.sex = :sexFilter', { sexFilter });
    if (stateFilter)
      queryBuilder.andWhere('address.state = :stateFilter', { stateFilter });
    if (cityIbgeCodeFilter)
      queryBuilder.andWhere('address.cityIbgeCode = :cityIbgeCodeFilter', {
        cityIbgeCodeFilter,
      });
    if (ageFilterParam)
      queryBuilder.andWhere('pets.age= :ageFilterParam', { ageFilterParam });
    if (ageTypeFilter)
      queryBuilder.andWhere('pets.ageType = :ageTypeFilter', { ageTypeFilter });

    const [results, total] = await queryBuilder
      .take(perPageAmount)
      .skip((currentPage - 1) * perPageAmount)
      .getManyAndCount();

    const totalPages = Math.ceil(total / perPageAmount);

    const pets = results.map((pet) => ({
      ...pet,
      personality: pet.personality.map((p) => p.personality),
    }));

    return {
      pets,
      currentPage,
      perPageAmount,
      total,
      totalPages,
    };
  }

  async doesPetBelongToUser(userId: string, donationId: string) {
    const pet = await this.petsRepository.findOne({
      where: { id: donationId, user: { id: userId } },
    });
    return !!pet;
  }

  async createDonation(
    addressId: string,
    userId: string,
    payload: CreatePetDonationDto,
  ): Promise<PetsEntity> {
    const personalityList = payload.personality;
    const user = await this.usersService.findUserByIdOrFail(userId);
    const address = await this.addressService.findAddressByIdOrFail(addressId);
    const breed = await this.animalBreedService.findAnimalBreedsByIdOrFail(
      payload.breedId,
      payload.petType,
    );

    delete payload.personality;
    delete payload.breedId;
    const newPetDonation = this.petsRepository.create({
      ...payload,
      user: user,
      address: address,
      breed: breed,
    });

    await this.petsRepository.save(newPetDonation);

    await this.createPetPersonalityRelationship(
      personalityList,
      newPetDonation,
    );

    return newPetDonation;
  }

  async createPetPersonalityRelationship(
    personalityList: PersonalityDto[],
    petDonation: PetsEntity,
  ): Promise<void> {
    const newPetPersonalityList: PetPersonalityEntity[] = [];

    for (let i = 0; i < personalityList.length; i++) {
      const personality = await this.personalityRepository.findOne({
        where: { id: personalityList[i].id },
      });

      const newPetPersonality = this.petsPersonalityRepository.create({
        pet: petDonation,
        personality: personality,
      });

      newPetPersonalityList.push(newPetPersonality);
    }
    await this.petsPersonalityRepository.save(newPetPersonalityList);
  }

  async updateDonation(
    donationId: string,
    updatePayload: UpdatePetDonationDto,
  ): Promise<PetsEntity> {
    // Implementar a edição da doação considerando os itens de personalidade e a troca da raça caso o usuário envie alterações
    const petDonation = await this.findDonationByIdOrFail(donationId);
    this.petsRepository.merge(petDonation, updatePayload);
    return await this.petsRepository.save(petDonation);
  }

  async deleteDonation(donationId: string): Promise<void> {
    const petDonation = await this.findDonationByIdOrFail(donationId);
    // Deve haver uma lógica para deletar as imagens de doação desse PET
    await this.petsRepository.remove(petDonation);
  }
}
