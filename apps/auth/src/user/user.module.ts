import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { DatabaseModule, JwtAuthGuard } from '@app/common';
import { User, UserSchema } from '../../../../libs/common/src/database/models/user.schema';
import { UserRepository } from '../../../../libs/common/src/database/repository/user.repository';
import { UserController } from './user.controller';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [
    
    UserService,
    UserRepository,
  ],
  exports: [UserService, UserRepository],
})
export class UserModule {}
