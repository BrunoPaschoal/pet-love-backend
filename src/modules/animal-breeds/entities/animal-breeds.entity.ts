import { PetsEntity } from 'src/modules/pets/entities/pets.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'animal-breeds' })
export class AnimalBreedsEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'pet_type' })
  petType: string;

  @OneToMany(() => PetsEntity, (pet) => pet.breed)
  pet: PetsEntity[];

  @Column({ unique: true, name: 'breed_name' })
  breedName: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updateddAt: string;
}
