import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AddPersonalityDto } from './dtos/add-personality.dto';
import { PersonalityEntity } from './entities/personality.entity';
import { PersonalityService } from './personality.service';

@Controller('personality')
@UseGuards(AuthGuard('jwt'))
export class PersonalityController {
  constructor(private readonly personalityService: PersonalityService) {}

  @Get()
  async findPersonalities(): Promise<PersonalityEntity[]> {
    return this.personalityService.findPersonalities();
  }

  @Post()
  async addPersonality(@Body() personality: AddPersonalityDto) {
    return this.personalityService.addPersonality(personality);
  }
}
