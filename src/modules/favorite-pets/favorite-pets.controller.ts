import {
  Controller,
  UseGuards,
  Post,
  Get,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserId } from '../auth/decorators/userId.decorator';
import { FavoritePetEntity } from './entities/favorite-pet.entity';
import { FavoritePetsService } from './favorite-pets.service';

@Controller('favorite')
@UseGuards(AuthGuard('jwt'))
export class FavoritePetsController {
  constructor(private readonly favoritePetsService: FavoritePetsService) {}

  @Post(':petDonationId')
  async favoritePet(
    @Param('petDonationId') petDonationId: string,
    @UserId() currentUserId: string,
  ): Promise<FavoritePetEntity> {
    return this.favoritePetsService.favoritePet(currentUserId, petDonationId);
  }

  @Get()
  async findUserFavorites(
    @UserId() currentUserId: string,
  ): Promise<FavoritePetEntity[]> {
    return this.favoritePetsService.findUserFavorites(currentUserId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async unfavoritePet(
    @UserId() currentUserId: string,
    @Param('id') petDonationId: string,
  ) {
    return this.favoritePetsService.unfavoritePet(petDonationId, currentUserId);
  }
}
