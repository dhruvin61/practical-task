import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenPayloadInterface, UserRoles } from '@app/common';
import { UserService } from './user/user.service';
import { CreateUserDto } from './user/dto/create-user.dto';
import { LoginUserDto } from './user/dto/user-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  async login(userDto: LoginUserDto) {
    const user = await this.userService.verifyUser(userDto);

    const tokenPayload: TokenPayloadInterface = {
      id: user._id.toHexString(),
      email: user.email,
      roles: user.roles,
    };
    const token: string = this.jwtService.sign(tokenPayload);

    return { token, role: user.roles, _id: user._id };
  }

  async register(userDto: CreateUserDto) {
    const { password, isDeleted, deletedAt, ...user } =
      await this.userService.create(userDto);
    return user;
  }
}
