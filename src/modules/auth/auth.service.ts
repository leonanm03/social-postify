import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthSigninDto } from './dto/auth-signin.dto';
import { UserRepository } from '../user/repositories/user.repository';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  private AUDIENCE = 'users';
  private ISSUER = 'SocialPostify';

  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signin(body: AuthSigninDto) {
    const { email, password } = body;
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid email or password');

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      throw new UnauthorizedException('Invalid email or password');

    return this.createToken(user);
  }

  createToken(user: User) {
    const token = this.jwtService.sign(
      {
        name: user.name,
        email: user.email,
      },
      {
        expiresIn: '7 days',
        subject: String(user.id),
        issuer: this.ISSUER,
        audience: this.AUDIENCE,
      },
    );

    return { token };
  }
}
