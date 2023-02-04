import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePetDonationDto } from './dtos/create-pet-donation.dto';
import { PetsEntity } from 'src/modules/pets/entities/pets.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { AddressService } from './../address/address.service';
import { UpdatePetDonationDto } from './dtos/update-pet-donation.dto';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(PetsEntity)
    private petsRepository: Repository<PetsEntity>,
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

    //CRIAR VALIDAÇÃO QUE VERIFICA SE O ENDEREÇO ENVIADO PERTENCE AO USUÁRIO ENVIADO

    const newPetDonation = this.petsRepository.create({
      ...payload,
      user: user,
      address: address,
    });

    await this.petsRepository.save(newPetDonation);

    return newPetDonation;
  }

  async updateDonation(
    donationId: string,
    updatePayload: UpdatePetDonationDto,
  ): Promise<PetsEntity> {
    const petDonation = await this.findDonationByIdOrFail(donationId);
    this.petsRepository.merge(petDonation, updatePayload);
    return await this.petsRepository.save(petDonation);
  }

  async deleteDonation(donationId: string): Promise<void> {
    const petDonation = await this.findDonationByIdOrFail(donationId);
    await this.petsRepository.remove(petDonation);
  }
}
