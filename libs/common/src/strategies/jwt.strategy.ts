import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';

import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  static extractJWTFromRequest(request: Request) {
    return ExtractJwt.fromAuthHeaderAsBearerToken()(request);
  }

  constructor(
    private readonly config: ConfigService,
  ) {
    super({
      jwtFromRequest: JwtStrategy.extractJWTFromRequest,
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(payload) {
    if(!payload){
      throw new UnauthorizedException();
    }
    return payload;
  }
}

