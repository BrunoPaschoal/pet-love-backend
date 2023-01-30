import { PetsEntity } from 'src/modules/pets/entities/pets.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'pet-donation-images' })
export class PetDonationImageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @ManyToOne(() => PetsEntity, (pet) => pet.images)
  pet: PetsEntity;
}
