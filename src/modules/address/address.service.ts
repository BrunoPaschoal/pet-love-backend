import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { CreateAddressDto } from './dtos/create-address.dto';
import { UpdateAddressDto } from './dtos/update-address.dto';
import { AddressEntity } from './entities/address.entity';
import { axiosInstance } from './../../config/axiosConfig';
import { PetsEntity } from './../pets/entities/pets.entity';
import {
  CepExternalConsultResponse,
  ConsultAddressByCepResponse,
} from './interfaces/addressInterfaces';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private addressRepository: Repository<AddressEntity>,
    @InjectRepository(PetsEntity)
    private petsRepository: Repository<PetsEntity>,
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

    const hasPetWhitTheAdress = await this.petsRepository.find({
      where: { address: { id: addreesId } },
    });

    const allowDelete = hasPetWhitTheAdress.length === 0 ? true : false;

    if (allowDelete) {
      await this.addressRepository.remove(address);
    }

    return {
      allowedToDelete: allowDelete,
      message: !allowDelete
        ? 'Vocês tem uma ou mais doações de pets associadas à esse endereço.'
        : '',
    };
  }

  async consultAddressByCep(cep: string): Promise<ConsultAddressByCepResponse> {
    const { data } = await axiosInstance.get<CepExternalConsultResponse>(
      '/cep',
      {
        params: { cep: cep },
      },
    );

    const consultResponse: ConsultAddressByCepResponse = {
      city: data.cidade.nome,
      state: data.estado.sigla,
      district: data.bairro,
      street: data.logradouro,
      cep: data.cep,
      cityIbgeCode: data.cidade.ibge,
      latitude: +data.latitude,
      longitude: +data.longitude,
    };

    return consultResponse;
  }
}
