import { Controller, UseGuards, Post } from '@nestjs/common';
import { Req } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req: any) {
    //O UseGuard local recebe o corpo da requisição, valida se o usuário e senha estão corretos e devolve o objeto user
    const authenticatedUser = await this.authService.login(req.user);
    return authenticatedUser;
  }
}
