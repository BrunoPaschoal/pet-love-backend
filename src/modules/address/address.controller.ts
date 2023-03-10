import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Validate } from 'class-validator';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dtos/create-address.dto';
import { UpdateAddressDto } from './dtos/update-address.dto';
import { AddressEntity } from './entities/address.entity';
import { ConsultAddressByCepResponse } from './interfaces/addressInterfaces';

@Controller('address')
@UseGuards(AuthGuard('jwt'))
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get(':id')
  async findUserAdress(@Param('id') id: string): Promise<AddressEntity[]> {
    return await this.addressService.findUserAddress(id);
  }

  @Get('consult-address/:cep')
  async consultAddress(
    @Param('cep') cep: string,
  ): Promise<ConsultAddressByCepResponse> {
    return await this.addressService.consultAddressByCep(cep);
  }

  @Get('single-address/:id')
  async findAdressById(@Param('id') id: string): Promise<AddressEntity> {
    return await this.addressService.findAddressByIdOrFail(id);
  }

  @Post(':id')
  @Validate(CreateAddressDto)
  async registerAddress(
    @Param('id') id: string,
    @Body() payload: CreateAddressDto,
  ): Promise<AddressEntity> {
    return await this.addressService.registerAddress(id, payload);
  }

  @Put(':id')
  @Validate(UpdateAddressDto)
  async updateAdress(
    @Param('id') id: string,
    @Body() payload: UpdateAddressDto,
  ): Promise<AddressEntity> {
    return await this.addressService.updateAdress(id, payload);
  }

  @Delete(':id')
  async deleteAddress(@Param('id') id: string) {
    return await this.addressService.deleteAddress(id);
  }
}
