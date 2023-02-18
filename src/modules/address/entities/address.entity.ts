import { PetsEntity } from 'src/modules/pets/entities/pets.entity';
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

@Entity({ name: 'address' })
export class AddressEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  district: string;

  @Column()
  street: string;

  @Column()
  number: number;

  @Column({ name: 'cep' })
  cep: string;

  @Column({ name: 'city_ibge_code' })
  cityIbgeCode: string;

  @Column({ type: 'float' })
  latitude: number;

  @Column({ type: 'float' })
  longitude: number;

  @ManyToOne(() => UserEntity, (user) => user.address)
  user: UserEntity;

  @OneToMany(() => PetsEntity, (pet) => pet.address)
  pets: PetsEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updateddAt: string;
}
