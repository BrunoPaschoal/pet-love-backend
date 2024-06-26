import { PetsEntity } from 'src/modules/pets/entities/pets.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'pet-donation-images' })
export class PetDonationImageEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  url: string;

  @Column()
  imageKey: string;

  @Column({ default: false })
  isMain: boolean;

  @ManyToOne(() => PetsEntity, (pet) => pet.images, { onDelete: 'CASCADE' })
  pet: PetsEntity;
}
