import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtAccountOutput } from '../interfaces/jwt-account.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // FIXME: use env for jwt secret
      secretOrKey: 'SECRET_KEY',
    });
  }

  async validate(payload: JwtAccountOutput) {
    if (!payload || !payload.id || !payload.username) {
      throw new UnauthorizedException('Unauthorized access');
    }

    return {
      id: payload.id,
      username: payload.username,
    };
  }
}
