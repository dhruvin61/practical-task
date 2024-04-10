import { ExtractJwt } from 'passport-jwt';
// import jwt from 'express-jwt';
// import { NestMiddleware, Injectable, UnauthorizedException } from '@nestjs/common';
// import { NextFunction, Request, Response } from 'express';
// import { ConfigService } from '@nestjs/config';
// @Injectable()
// export class JWTMiddleware implements NestMiddleware {
//   constructor(private readonly config: ConfigService) {}

//   async use(req: Request, res: Response, next: NextFunction): Promise<void> {
//     jwt({
//       secret: this.config.get('JWT_SECRET'),
//       requestProperty: 'jwtPayload',
//       credentialsRequired: false,
//       getToken: (request: Request) => ExtractJwt.fromAuthHeaderAsBearerToken()(request),
//     })(req, res, (error) => {

//       return next();
//     });
//   }
// }
