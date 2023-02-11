import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'cat-breeds' })
export class CatBreedsEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true, name: 'breed_name' })
  breedName: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updateddAt: string;
}
