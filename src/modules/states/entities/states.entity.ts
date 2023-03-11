import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'states' })
export class StatesEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  ibge: string;

  @Column()
  name: string;

  @Column()
  acronym: string;
}
