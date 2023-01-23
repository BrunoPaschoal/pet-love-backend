import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { UserEntity } from './../users/database/user.entitiy';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    let user: UserEntity;
    try {
      user = await this.usersService.findUserByEmailOrFail(email);
    } catch (error) {
      return null;
    }

    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) return null;

    return user;
  }

  async login(user: UserEntity) {
    const payload = { sub: user.id, email: user.email };

    return {
      ...user,
      token: this.jwtService.sign(payload),
    };
  }
}
