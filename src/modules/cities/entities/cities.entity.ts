import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'cities' })
export class CitiesEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  city: string;

  @Column()
  ibge: string;
}
