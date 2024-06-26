import { AddressEntity } from 'src/modules/address/entities/address.entity';
import { FavoritePetEntity } from 'src/modules/favorite-pets/entities/favorite-pet.entity';
import { PetsEntity } from 'src/modules/pets/entities/pets.entity';
import { RoleEntity } from 'src/modules/role/entities/role.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  avatar: string;

  @ManyToOne(() => RoleEntity, (role) => role.id)
  role: RoleEntity;

  @OneToMany(() => AddressEntity, (address) => address.user)
  address: AddressEntity[];

  @OneToMany(() => FavoritePetEntity, (favorite) => favorite.user)
  favoritePets: FavoritePetEntity[];

  @OneToMany(() => PetsEntity, (pet) => pet.user)
  petDonations: PetsEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updateddAt: string;
}
