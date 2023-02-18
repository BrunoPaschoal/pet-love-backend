import { PetPersonalityEntity } from 'src/modules/pets/entities/pets-personality.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'personality' })
export class PersonalityEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(
    () => PetPersonalityEntity,
    (personality) => personality.personality,
  )
  petPersonalities: PetPersonalityEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updateddAt: string;
}
