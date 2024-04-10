import {
  MiddlewareConsumer,
  Module,
  RequestMethod,
  ValidationPipe,
} from '@nestjs/common';
import { CoursesService } from './services/courses.service';
import { CoursesController } from './courses.controller';
import { DatabaseModule, JwtAuthGuard, JwtStrategy } from '@app/common';
import { CourseRepository } from '../../../libs/common/src/database/repository/courses.repository';
import {
  Course,
  CourseSchema,
} from '../../../libs/common/src/database/models/course.schema';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { validate } from '@app/common/validation/env.validation';
import { LessonService } from './services/lesson.service';
import {
  Lesson,
  LessonSchema,
} from '@app/common/database/models/lesson.schema';
import { LessonRepository } from '@app/common/database/repository/lesson.repository';
import {
  Enrollment,
  EnrollmentSchema,
} from '@app/common/database/models/enrollment.schema';
import { EnrollmentRepository } from '@app/common/database/repository/enrollment.repository';
import { UserRepository } from '@app/common/database/repository/user.repository';
import { User, UserSchema } from '@app/common/database/models/user.schema';
@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: Course.name, schema: CourseSchema },
      { name: Lesson.name, schema: LessonSchema },
      { name: Enrollment.name, schema: EnrollmentSchema },
      { name: User.name, schema: UserSchema },
    ]),
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
  controllers: [CoursesController],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: JwtAuthGuard,
    },
    JwtStrategy,
    CoursesService,
    LessonService,
    LessonRepository,
    EnrollmentRepository,
    UserRepository,
    CourseRepository,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ whitelist: true, transform: true }),
    },
  ],
  exports: [CoursesService, CourseRepository, LessonService, LessonRepository],
})
export class CoursesModule {}
