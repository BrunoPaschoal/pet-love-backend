import { PersonalityEntity } from 'src/modules/personality/entities/personality.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PetsEntity } from './pets.entity';

@Entity({ name: 'pet_personality' })
export class PetPersonalityEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => PetsEntity, (pet) => pet.personality)
  pet: PetsEntity;

  @ManyToOne(
    () => PersonalityEntity,
    (personality) => personality.petPersonalities,
  )
  personality: PersonalityEntity;
}
