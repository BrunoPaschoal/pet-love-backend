import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { CreateAddressDto } from './dtos/create-address.dto';
import { UpdateAddressDto } from './dtos/update-address.dto';
import { AddressEntity } from './entities/address.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private addressRepository: Repository<AddressEntity>,
    private readonly usersService: UsersService,
  ) {}

  async registerAddress(
    userId: string,
    payload: CreateAddressDto,
  ): Promise<AddressEntity> {
    const user = await this.usersService.findUserByIdOrFail(userId);
    const newAddress = this.addressRepository.create(payload);
    newAddress.user = user;
    await this.addressRepository.save(newAddress);
    return newAddress;
  }

  async findUserAddress(userId: string): Promise<AddressEntity[]> {
    await this.usersService.findUserByIdOrFail(userId);

    const addressList = await this.addressRepository.find({
      where: { user: { id: userId } },
    });

    return addressList;
  }

  async findAddressByIdOrFail(adressId: string): Promise<AddressEntity> {
    const address = await this.addressRepository.findOne({
      where: { id: adressId },
    });

    if (!address) {
      throw new HttpException(
        'Endereço não encontrado na base de dados!',
        HttpStatus.NOT_FOUND,
      );
    }
    return address;
  }

  async updateAdress(
    addreesId: string,
    payload: UpdateAddressDto,
  ): Promise<AddressEntity> {
    const address = await this.addressRepository.findOne({
      where: { id: addreesId },
    });

    if (!address) {
      throw new HttpException('Endereço não encontrado!', HttpStatus.NOT_FOUND);
    }

    this.addressRepository.merge(address, payload);

    return await this.addressRepository.save(address);
  }

  async deleteAddress(addreesId: string) {
    const address = await this.addressRepository.findOne({
      where: { id: addreesId },
    });

    if (!address) {
      throw new HttpException('Endereço não encontrado!', HttpStatus.NOT_FOUND);
    }

    await this.addressRepository.remove(address);
  }
}
