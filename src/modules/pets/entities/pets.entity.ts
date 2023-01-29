import { AddressEntity } from 'src/modules/address/entities/address.entity';
import { UserEntity } from 'src/modules/users/entities/user.entitiy';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'pets' })
export class PetsEntity {
  @PrimaryGeneratedColumn()
  id: string;

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

  @ManyToOne(() => AddressEntity, (address) => address.pets)
  address: AddressEntity;

  @ManyToOne(() => UserEntity, (user) => user.petDonations)
  user: UserEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updateddAt: string;
}
