import { IsNotEmpty } from 'class-validator';

export class AddPersonalityDto {
  @IsNotEmpty()
  personality: string;
}
