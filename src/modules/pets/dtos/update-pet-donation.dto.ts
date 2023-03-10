import { Type } from 'class-transformer';
import {
  IsNumber,
  IsString,
  IsOptional,
  ValidateNested,
  IsArray,
  IsIn,
} from 'class-validator';
import {
  AgeType,
  PetSex,
  PetSize,
  PetType,
} from '../interfaces/petsInterfaces';
import { PersonalityDto } from './personality.dto';

export class UpdatePetDonationDto {
  @IsOptional()
  @IsString()
  @IsIn([PetType.DOG, PetType.CAT])
  petType: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  age: number;

  @IsOptional()
  @IsString()
  @IsIn([AgeType.MONTHS, AgeType.YEARS])
  ageType: string;

  @IsOptional()
  @IsString()
  @IsIn([PetSize.SMALL, PetSize.MID, PetSize.LARGE])
  size: string;

  @IsOptional()
  @IsString()
  @IsIn([PetSex.MALE, PetSex.FEMALE])
  sex: string;

  @IsOptional()
  @IsString()
  breedId: string;

  @IsOptional()
  @IsString()
  petStory: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PersonalityDto)
  personality: PersonalityDto[];
}
