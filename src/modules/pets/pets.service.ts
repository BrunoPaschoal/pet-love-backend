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
import { PetType } from './interfaces/petsInterfaces';

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
  ) {}
  async findDonations() {
    return await this.petsRepository.find();
  }

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
    const user = await this.usersService.findUserByIdOrFail(userId);
    const address = await this.addressService.findAddressByIdOrFail(addressId);
    const personalityList = payload.personality;
    const breedId = payload.breedId;

    delete payload.personality;
    delete payload.breedId;
    const newPetDonation = this.petsRepository.create({
      ...payload,
      user: user,
      address: address,
    });

    await this.petsRepository.save(newPetDonation);
    await this.createPetPersonalityRelationship(
      personalityList,
      newPetDonation,
    );

    await this.createBreedPetRelationship(
      breedId,
      payload.petType,
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

  async createBreedPetRelationship(
    breedId: string,
    petType: string,
    petDonation: PetsEntity,
  ): Promise<void> {
    // Implementar
    if (petType === PetType.CAT) {
      /* Criar relação com raças de gatos */
    }

    if (petType === PetType.DOG) {
      /* Criar relação com raças de cachorro */
    }
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
