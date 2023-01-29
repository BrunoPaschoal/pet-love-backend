import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetsController } from './pets.controller';
import { PetsService } from './pets.service';
import { PetsEntity } from 'src/modules/pets/entities/pets.entity';
import { UsersModule } from '../users/users.module';
import { AddressModule } from '../address/address.module';

@Module({
  imports: [TypeOrmModule.forFeature([PetsEntity]), UsersModule, AddressModule],
  controllers: [PetsController],
  providers: [PetsService],
})
export class PetsModule {}
