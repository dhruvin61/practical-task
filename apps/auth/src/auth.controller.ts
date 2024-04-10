import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

import { User } from '../../../libs/common/src/database/models/user.schema';
import { Response } from 'express';
import { CurrentUser } from '@app/common';
import { CreateUserDto } from './user/dto/create-user.dto';
import { LoginUserDto } from './user/dto/user-login.dto';
import { Public } from '@app/common/decorators/public.decorator';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/register')
  async register(
    @Body() userDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.authService.register(userDto);
  }

  @Public()
  @Post('/login')
  async login(
    @Body() userDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.authService.login(userDto);
  }

}
