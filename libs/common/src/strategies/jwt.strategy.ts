import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';

import { ConfigService } from '@nestjs/config';
import { TokenPayloadInterface } from '@app/common/interfaces';
import { UserRepository } from '@app/common/database/repository/user.repository';

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor(private configService: ConfigService) {
//     super({
//       ignoreExpiration: false,
//       secretOrKey: configService.get<string>('JWT_SECRET'),
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     });
//   }

//   async validate(payload: TokenPayloadInterface) {
//     return payload;
//   }
// }

// import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { Strategy, ExtractJwt } from 'passport-jwt';
// import { jwtConstants } from './Util/jwt.constants';
// import { AuthService } from './auth.service';

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


// export class JwtStrategy extends PassportStrategy(Strategy) {
//   static extractJWTFromRequest(request: Request) {
//     return ExtractJwt.fromAuthHeaderAsBearerToken()(request);
//   }

//   constructor(
//     private readonly config: ConfigService,
//     private readonly userService: UserService,
//     private readonly userRepository: UserRepository,
//   ) {
//     super({
//       jwtFromRequest: JwtStrategy.extractJWTFromRequest,
//       ignoreExpiration: false,
//       secretOrKey: config.get('JWT_SECRET'),
//       passReqToCallback: true,
//     } as StrategyOptions);
//   }

//   async validate(
//     request: Request & { jwtPayload: Record<string, any> }, // addded by JWTMiddleware
//     // payload: { sub: string; id: number },
//   ): Promise<User> {
//     let query: FilterQuery<User> = {
//       $or: [
//         // {
//         //   oid: payload.id,
//         // },
//       ],
//     };

//     if (request.jwtPayload) {
//       const sessionToken = crypto
//         .createHash('md5')
//         .update(JwtStrategy.extractJWTFromRequest(request))
//         .digest('hex');

//       query.$or.push({
//         sessionToken,
//       });

//       query.$or.push({
//         creatorSessionToken: sessionToken,
//       });
//     }

//     if (
//       this.config.get('NODE_ENV') === Environment.Development &&
//       this.config.get('MOCK_USER_EMAIL')
//     ) {
//       query = {
//         email: this.config.get('MOCK_USER_EMAIL'),
//       };
//     }

//     const user = await this.userRepository.findOne(query);

//     if (!user || (await this.userService.isRestricted(user))) {
//       throw new UnauthorizedException();
//     }

//     return user;
//   }
// }
