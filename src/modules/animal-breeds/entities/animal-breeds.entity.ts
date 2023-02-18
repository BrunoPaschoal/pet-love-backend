import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'animal-breeds' })
export class AnimalBreedsEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'pet_type' })
  petType: string;

  @Column({ unique: true, name: 'breed_name' })
  breedName: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updateddAt: string;
}
