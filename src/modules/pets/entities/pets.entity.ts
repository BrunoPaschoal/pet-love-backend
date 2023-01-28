import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'pets' })
export class PetsEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  petName: string;

  @Column()
  petAge: number;

  @Column()
  ageCategory: string;

  @Column()
  petSizeCategory: string;

  @Column()
  petSex: string;

  @Column()
  breed: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updateddAt: string;
}
