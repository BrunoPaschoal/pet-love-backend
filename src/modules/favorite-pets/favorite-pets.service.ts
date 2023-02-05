import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PetsService } from '../pets/pets.service';
import { UsersService } from '../users/users.service';
import { FavoritePetEntity } from './entities/favorite-pet.entity';

@Injectable()
export class FavoritePetsService {
  constructor(
    @InjectRepository(FavoritePetEntity)
    private favoritePetsRepository: Repository<FavoritePetEntity>,
    private readonly usersService: UsersService,
    private readonly petService: PetsService,
  ) {}

  async favoritePet(
    userId: string,
    petDonationId: string,
  ): Promise<FavoritePetEntity> {
    const user = await this.usersService.findUserByIdOrFail(userId);
    const petDonation = await this.petService.findDonationByIdOrFail(
      petDonationId,
    );

    //Checks if the pet is already in the user's favorites list
    const isExistOnTheFavoriteList = await this.alreadyInTheTavorites(
      userId,
      petDonationId,
    );

    if (isExistOnTheFavoriteList) {
      throw new HttpException(
        'Esse anúncio de doação já está na lista de favoritos do usuário!',
        HttpStatus.BAD_REQUEST,
      );
    }

    //Checks if the pet belongs to the user
    const petBelongsToTheUser = await this.petService.doesPetBelongToUser(
      userId,
      petDonationId,
    );

    if (petBelongsToTheUser) {
      throw new HttpException(
        'Usuários não podem adicionar aos favoritos seus próprios anúncios de doação!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newFavorite = this.favoritePetsRepository.create({
      pet: petDonation,
      user: user,
    });

    await this.favoritePetsRepository.save(newFavorite);

    return newFavorite;
  }

  async findUserFavorites(userId: string): Promise<FavoritePetEntity[]> {
    await this.usersService.findUserByIdOrFail(userId);

    const userFavoritePets = await this.favoritePetsRepository
      .createQueryBuilder('favoritePet')
      .leftJoinAndSelect('favoritePet.pet', 'pet')
      .where('favoritePet.userId = :userId', { userId })
      .getMany();

    return userFavoritePets;
  }

  async unfavoritePet(favoriteId: string) {
    const favoritePet = await this.favoritePetsRepository.findOne({
      where: { id: favoriteId },
    });

    if (!favoritePet) {
      throw new HttpException(
        'O anúncio de doação não está em seus favoritos!',
        HttpStatus.OK,
      );
    }

    await this.favoritePetsRepository.remove(favoritePet);
  }

  async alreadyInTheTavorites(userId: string, donationId: string) {
    const ifExist = await this.favoritePetsRepository.findOne({
      where: { pet: { id: donationId }, user: { id: userId } },
    });
    return !!ifExist;
  }
}
