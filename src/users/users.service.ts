import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  createUser(): string {
    return 'Users module response!';
  }
}
