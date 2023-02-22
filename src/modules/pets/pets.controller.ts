import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PetsService } from './pets.service';
import { CreatePetDonationDto } from './dtos/create-pet-donation.dto';
import { PetsEntity } from './entities/pets.entity';
import { Validate } from 'class-validator';
import { UpdatePetDonationDto } from './dtos/update-pet-donation.dto';
import { FindPetByDistanceDto } from './dtos/find-pet-by-distance.dto';

@Controller('pets')
@UseGuards(AuthGuard('jwt'))
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Get('donations')
  async findPetsByDistance(@Query() payload) {
    return this.petsService.findPetsByDistance(payload);
  }

  @Get('donations/:id')
  async getUserDonations(
    @Param('id') userId: string,
    @Query('page') page: number,
    @Query('perPage') perPage: number,
  ) {
    return this.petsService.findUserDonations(userId, page, perPage);
  }

  @Post('donations')
  @Validate(CreatePetDonationDto)
  async createDonation(
    @Body() payload: CreatePetDonationDto,
    @Query('addressId') addressId: string,
    @Query('userId') userId: string,
  ): Promise<PetsEntity> {
    return this.petsService.createDonation(addressId, userId, payload);
  }

  @Put('donations/:id')
  @Validate(UpdatePetDonationDto)
  async updateDonation(
    @Body() payload: UpdatePetDonationDto,
    @Param('id') id: string,
  ): Promise<PetsEntity> {
    return this.petsService.updateDonation(id, payload);
  }

  @Delete('donations/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletePetDonation(@Param('id') id: string) {
    return await this.petsService.deleteDonation(id);
  }
}
