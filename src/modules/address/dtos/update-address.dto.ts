import { Allow, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateAddressDto {
  @IsString()
  @IsOptional()
  @Allow()
  city: string;

  @IsString()
  @IsOptional()
  @Allow()
  state: string;

  @IsString()
  @IsOptional()
  @Allow()
  district: string;

  @IsString()
  @IsOptional()
  @Allow()
  street: string;

  @IsNumber()
  @IsOptional()
  @Allow()
  number: number;

  @IsString()
  @IsOptional()
  @Allow()
  cep: string;

  @IsString()
  @IsOptional()
  @IsNumber()
  latitude: number;

  @IsString()
  @IsOptional()
  @IsNumber()
  longitude: number;

  @IsString()
  @IsOptional()
  @Allow()
  cityIbgeCode: string;
}
