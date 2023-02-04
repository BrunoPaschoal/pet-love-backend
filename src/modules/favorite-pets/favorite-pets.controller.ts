import { Controller, Query, UseGuards, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FavoritePetEntity } from './entities/favorite-pet.entity';
import { FavoritePetsService } from './favorite-pets.service';

@Controller('favorite-pets')
@UseGuards(AuthGuard('jwt'))
export class FavoritePetsController {
  constructor(private readonly favoritePetsService: FavoritePetsService) {}

  @Post()
  async updateDonation(
    @Query('petDonationId') petDonationId: string,
    @Query('userId') userId: string,
  ): Promise<FavoritePetEntity> {
    return this.favoritePetsService.favoritePet(userId, petDonationId);
  }
}
