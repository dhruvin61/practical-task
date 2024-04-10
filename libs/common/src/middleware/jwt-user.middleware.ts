// import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
// import { NestMiddleware, Injectable, UnauthorizedException } from '@nestjs/common';
// import { Request, Response } from 'express';
// import { UserService } from 'apps/auth/src/user/user.service';
// import { AuthService } from 'apps/auth/src/auth.service';

// @Injectable()
// export class UserFromJWTMiddleware implements NestMiddleware {
//   constructor(
//     private readonly authService: AuthService,
//     private readonly userService: UserService,
//   ) {}

//   async use(
//     req: Request & { jwtPayload?: { sub: string } },
//     res: Response,
//     next: (err?: Error) => any,
//   ): Promise<void> {
//     if (req.user || !req.jwtPayload) {
//       return next();
//     }

//     try {
//       if (req.jwtPayload) {
//         const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
//         const user = await this.(token);

//         if (user) {
//           if (await this.userService.isRestricted(user)) {
//             throw new UnauthorizedException();
//           }

//           req.user = user;
//         }
//       }

//       return next();
//     } catch (error) {
//       return next(error);
//     }
//   }
// }
