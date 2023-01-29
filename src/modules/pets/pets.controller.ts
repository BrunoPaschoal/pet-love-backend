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

@Controller('pets')
@UseGuards(AuthGuard('jwt'))
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Get('donations')
  async getDonations(): Promise<PetsEntity[]> {
    return this.petsService.findDonations();
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
