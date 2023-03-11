import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitiesController } from './cities.controller';
import { CitiesService } from './cities.service';
import { CitiesEntity } from './entities/cities.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CitiesEntity])],
  controllers: [CitiesController],
  providers: [CitiesService],
})
export class CitiesModule {}
