import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PetsService } from './pets.service';

@Controller('pets')
@UseGuards(AuthGuard('jwt'))
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Get('donations')
  async getDonations() {
    return this.petsService.findDonations();
  }

  @Post('donations/:id')
  async createDonation(@Param('id') userId: string, @Body() payload) {
    return this.petsService.createDonation(userId, payload);
  }
}
