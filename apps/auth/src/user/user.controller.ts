import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';

import {  Roles, UserRoles } from '@app/common';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(UserRoles.User)
  findAll(@Req() req) {
    return this.userService.findAll();
  }

  @Roles(UserRoles.User, UserRoles.Teacher)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Roles(UserRoles.User, UserRoles.Teacher)
  @Put(':id')
  update(@Param('id') id: string, @Body() userDto: UpdateUserDto) {
    return this.userService.update(id, userDto);
  }
}
