import { IsIn } from 'class-validator';
import { Role } from '../interfaces/role.interface';

export class CreateRoleDto {
  @IsIn([Role.ADMIN, Role.MASTER, Role.USER])
  name: string;
}
