import {
  Controller,
  Query,
  UseGuards,
  Post,
  Get,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FavoritePetEntity } from './entities/favorite-pet.entity';
import { FavoritePetsService } from './favorite-pets.service';

@Controller('favorite-pets')
@UseGuards(AuthGuard('jwt'))
export class FavoritePetsController {
  constructor(private readonly favoritePetsService: FavoritePetsService) {}

  @Post()
  async favoritePet(
    @Query('petDonationId') petDonationId: string,
    @Query('userId') userId: string,
  ): Promise<FavoritePetEntity> {
    return this.favoritePetsService.favoritePet(userId, petDonationId);
  }

  @Get(':id')
  async findUserFavorites(
    @Param('id') userId: string,
  ): Promise<FavoritePetEntity[]> {
    return this.favoritePetsService.findUserFavorites(userId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async unfavoritePet(@Param('id') favoriteId: string) {
    return this.favoritePetsService.unfavoritePet(favoriteId);
  }
}
