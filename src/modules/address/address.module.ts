import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { AddressEntity } from './entities/address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AddressEntity]), UsersModule],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
