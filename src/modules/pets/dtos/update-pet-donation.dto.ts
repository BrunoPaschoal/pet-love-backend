import { IsNumber, IsString, IsOptional } from 'class-validator';

export class UpdatePetDonationDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  age: number;

  @IsOptional()
  @IsString()
  ageType: string;

  @IsOptional()
  @IsString()
  size: string;

  @IsOptional()
  @IsString()
  sex: string;
}
