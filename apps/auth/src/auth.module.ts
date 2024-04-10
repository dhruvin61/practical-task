import { Module, ValidationPipe } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from './user/user.module';
import { APP_PIPE } from '@nestjs/core';
import { DatabaseModule, JwtAuthGuard, JwtStrategy } from '@app/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { validate } from '@app/common/validation/env.validation';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET'),
        signOptions: config.get('JWT_SIGN_OPTIONS'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: 'APP_GUARD',
      useClass: JwtAuthGuard,
    },
    JwtStrategy,
    { provide: APP_PIPE, useValue: new ValidationPipe({ whitelist: true }) },
  ],
})
export class AuthModule {}
