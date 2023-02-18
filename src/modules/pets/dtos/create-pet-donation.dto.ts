import { Type } from 'class-transformer';
import {
  IsArray,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import {
  AgeType,
  PetSex,
  PetSize,
  PetType,
} from '../interfaces/petsInterfaces';
import { PersonalityDto } from './personality.dto';

export class CreatePetDonationDto {
  @IsNotEmpty()
  @IsString()
  @IsIn([PetType.DOG, PetType.CAT])
  petType: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNumber()
  age: number;

  @IsString()
  @IsIn([AgeType.MONTHS, AgeType.YEARS])
  ageType: string;

  @IsNotEmpty()
  @IsString()
  @IsIn([PetSize.SMALL, PetSize.MID, PetSize.LARGE])
  size: string;

  @IsNotEmpty()
  @IsString()
  @IsIn([PetSex.MALE, PetSex.FEMALE])
  sex: string;

  @IsNotEmpty()
  @IsString()
  breedId: string;

  @IsNotEmpty()
  @IsString()
  petStory: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PersonalityDto)
  personality: PersonalityDto[];
}
