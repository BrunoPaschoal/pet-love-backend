import { Injectable } from '@nestjs/common';
import { CreatePetDonationDto } from './dtos/create-pet-donation.dto';
import { PetsEntity } from 'src/modules/pets/entities/pets.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { AddressService } from './../address/address.service';

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

  async createDonation(payload: CreatePetDonationDto): Promise<PetsEntity> {
    const user = await this.usersService.findUserByIdOrFail(payload.userId);

    const address = await this.addressService.findAddressByIdOrFail(
      payload.addressId,
    );

    const newPetDonation = this.petsRepository.create({
      name: payload.name,
      age: payload.age,
      ageType: payload.ageType,
      sex: payload.sex,
      size: payload.size,
      breed: payload.breed,
      user: user,
      address: address,
    });

    await this.petsRepository.save(newPetDonation);

    return newPetDonation;
  }
}
