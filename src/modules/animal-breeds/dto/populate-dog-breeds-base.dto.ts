import { IsNotEmpty } from 'class-validator';

export class PopulateDogBreedsBaseDto {
  @IsNotEmpty()
  dogBreeds: string[];
}
