import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from '../../../../libs/common/src/database/repository/user.repository';
import { User } from '../../../../libs/common/src/database/models/user.schema';
import * as bcrypt from 'bcrypt';
import { UserRoles } from '@app/common';
import { ObjectId } from 'mongoose';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async create(createUserInput: CreateUserDto): Promise<User> {
    await this.validateCreateUserDto(createUserInput);

    const passwordHashed: string = await bcrypt.hash(
      createUserInput.password,
      12,
    );

    return this.userRepository.create({
      ...createUserInput,
      password: passwordHashed,
      roles: createUserInput.role
        ? [UserRoles[createUserInput.role]]
        : [UserRoles.User],
    });
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find(
      {},
      { password: 0, isDeleted: 0, deletedAt: 0, updatedAt: 0 },
    );
  }

  findOne(id: string | ObjectId) {
    return this.userRepository.findOne({ _id: id });
  }

  update(id: string, updateUserInput: UpdateUserDto): Promise<User> {
    return this.userRepository.findOneAndUpdate(
      { _id: id },
      { $set: { ...updateUserInput } },
    );
  }

  remove(id: string): Promise<User> {
    return this.userRepository.findOneAndDelete({ _id: id });
  }

  async verifyUser({
    email,
    password,
  }: Pick<User, 'email' | 'password'>): Promise<User> {
    const user = await this.userRepository.findOne({ email });
    const passCheck = await bcrypt.compare(password, user.password);
    if (!passCheck) {
      throw new UnauthorizedException('User or password is incorrect');
    }
    return user;
  }

  private async validateCreateUserDto(createUserDto: CreateUserDto) {
    try {
      await this.userRepository.findOne({ email: createUserDto.email });
    } catch (e) {
      return;
    }
    throw new UnprocessableEntityException('Email already exists');
  }
}
