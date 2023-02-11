import { IsNotEmpty } from 'class-validator';

export class PopulateCatBreedsBaseDto {
  @IsNotEmpty()
  catBreeds: string[];
}
