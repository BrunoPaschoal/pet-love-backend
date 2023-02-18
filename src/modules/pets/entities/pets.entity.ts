import { AddressEntity } from 'src/modules/address/entities/address.entity';
import { FavoritePetEntity } from 'src/modules/favorite-pets/entities/favorite-pet.entity';
import { PetDonationImageEntity } from 'src/modules/upload-files/entities/pet-donation-images.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PetPersonalityEntity } from './pets-personality.entity';

@Entity({ name: 'pets' })
export class PetsEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'pet_type' })
  petType: string;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  ageType: string;

  @Column()
  size: string;

  @Column()
  sex: string;

  @Column()
  breed: string;

  @Column({ name: 'pet_story' })
  petStory: string;

  @OneToMany(
    () => PetDonationImageEntity,
    (petDonationImage) => petDonationImage.pet,
  )
  images: PetDonationImageEntity[];

  @ManyToOne(() => AddressEntity, (address) => address.pets)
  address: AddressEntity;

  @OneToMany(() => FavoritePetEntity, (favorite) => favorite.pet)
  favoritePets: FavoritePetEntity[];

  @ManyToOne(() => UserEntity, (user) => user.petDonations)
  user: UserEntity;

  @OneToMany(() => PetPersonalityEntity, (petPersonality) => petPersonality.pet)
  personality: PetPersonalityEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updateddAt: string;
}
