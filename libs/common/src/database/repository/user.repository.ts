import { AbstractRepository } from '@app/common';
import { User } from '../models/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class UserRepository extends AbstractRepository<User> {
  protected readonly logger: Logger = new Logger(UserRepository.name);
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {
    super(userModel);
  }
}
