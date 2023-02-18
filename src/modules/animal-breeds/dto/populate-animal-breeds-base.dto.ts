import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { AnimalBreedsTypeDto } from './animal-breeds-type.dto';

export class PopulateAnimalBreedsBaseDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AnimalBreedsTypeDto)
  animalBreeds: AnimalBreedsTypeDto[];
}
