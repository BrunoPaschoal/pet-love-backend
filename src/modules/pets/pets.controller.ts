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
import { FindPetDonationsDto } from './dtos/find-pet-by-distance.dto';
import { UserId } from '../auth/decorators/userId.decorator';

@Controller('pets')
@UseGuards(AuthGuard('jwt'))
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Get('donations')
  async findPetDonations(
    @Query() payload: FindPetDonationsDto,
    @UserId() currentUserId: string,
  ) {
    return this.petsService.findPetDonations(payload, currentUserId);
  }

  @Get('donations')
  async getUserDonations(
    @UserId() currentUserId: string,
    @Query('page') page: number,
    @Query('perPage') perPage: number,
  ) {
    return this.petsService.findUserDonations(currentUserId, page, perPage);
  }

  @Post('donations')
  @Validate(CreatePetDonationDto)
  async createDonation(
    @UserId() currentUserId: string,
    @Body() payload: CreatePetDonationDto,
  ): Promise<PetsEntity> {
    return this.petsService.createDonation(currentUserId, payload);
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
