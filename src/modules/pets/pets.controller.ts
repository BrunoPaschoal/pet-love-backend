import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PetsService } from './pets.service';
import { CreatePetDonationDto } from './dtos/create-pet-donation.dto';
import { PetsEntity } from './entities/pets.entity';
import { Validate } from 'class-validator';

@Controller('pets')
@UseGuards(AuthGuard('jwt'))
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Get('donations')
  async getDonations() {
    return this.petsService.findDonations();
  }

  @Post('donations')
  @Validate(CreatePetDonationDto)
  async createDonation(
    @Body() payload: CreatePetDonationDto,
  ): Promise<PetsEntity> {
    return this.petsService.createDonation(payload);
  }
}
