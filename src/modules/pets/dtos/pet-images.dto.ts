import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class PetImagesDto {
  @IsBoolean()
  isMain: boolean;

  @IsNotEmpty()
  @IsString()
  file: string;
}
