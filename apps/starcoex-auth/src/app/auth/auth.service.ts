import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginInput } from './dto/login.input';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { compare } from 'bcryptjs';
import { GqlContext, TokenPayload } from '@starcoex/nestjs';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) {}

  async login(loginInput: LoginInput, context: GqlContext) {
    const user = await this.verifyUser(loginInput);
    const expires = new Date();
    expires.setMilliseconds(
      expires.getTime() +
        parseInt(this.configService.get('AUTH_JWT_EXPIRATION_MS'))
    );
    const tokenPayload: TokenPayload = { userId: user.id };
    const accessToken = this.jwtService.sign(tokenPayload);
    context.res.cookie('Authentication', accessToken, {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
      expires,
    });
    return user;
  }

  private async verifyUser(loginInput: LoginInput): Promise<User> {
    try {
      const user = await this.userService.getUser({ email: loginInput.email });
      const authenticated = await compare(loginInput.password, user.password);
      if (!authenticated) {
        throw new UnauthorizedException('테스트입니다.');
      }
      return user;
    } catch (err) {
      throw new UnauthorizedException('자격증명이 유요하지 않습니다.');
    }
  }
}
