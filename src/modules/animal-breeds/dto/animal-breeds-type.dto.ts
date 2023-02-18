import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import { PetType } from 'src/modules/pets/interfaces/petsInterfaces';

export class AnimalBreedsTypeDto {
  @IsNotEmpty()
  breedName: string;

  @IsNotEmpty()
  @IsString()
  @IsIn([PetType.DOG, PetType.CAT, PetType.BOTH])
  petType: PetType;
}
