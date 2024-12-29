import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from '@starcoex/nestjs';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: any) => req.cookies.Authentication,
      ]),
      secretOrKey: configService.getOrThrow('AUTH_JWT_SECRET'),
    });
  }

  validate(payload: TokenPayload) {
    return payload;
  }
}
