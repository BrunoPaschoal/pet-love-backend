import { AddressEntity } from 'src/modules/address/entities/address.entity';
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

  @ManyToOne(() => RoleEntity, (role) => role.id)
  role: RoleEntity;

  @OneToMany(() => AddressEntity, (address) => address.user)
  address: AddressEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updateddAt: string;
}
