import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './../../users/entities/user.entity';
import { PetsEntity } from './../../pets/entities/pets.entity';

@Entity({ name: 'favorite-pets' })
export class FavoritePetEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => UserEntity, (user) => user.favoritePets, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;

  @ManyToOne(() => PetsEntity, (pet) => pet.favoritePets, {
    onDelete: 'CASCADE',
  })
  pet: PetsEntity;
}
