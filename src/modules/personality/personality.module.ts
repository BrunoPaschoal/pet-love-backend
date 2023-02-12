import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonalityEntity } from './entities/personality.entity';
import { PersonalityController } from './personality.controller';
import { PersonalityService } from './personality.service';

@Module({
  imports: [TypeOrmModule.forFeature([PersonalityEntity])],
  controllers: [PersonalityController],
  providers: [PersonalityService],
})
export class PersonalityModule {}
