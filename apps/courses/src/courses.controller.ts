import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { CoursesService } from './services/courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CurrentUser, Roles, UserRoles } from '@app/common';
import { User } from '@app/common/database/models/user.schema';
import { LessonService } from './services/lesson.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import mongoose from 'mongoose';

@Controller('course')
export class CoursesController {
  constructor(
    private readonly coursesService: CoursesService,
    private readonly lessonService: LessonService,
  ) {}

  @Roles(UserRoles.Teacher)
  @Post()
  create(
    @Body() createCourseDto: CreateCourseDto,
    @Body() { userId }: { userId: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.coursesService.create(createCourseDto, userId);
  }

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(+id, updateCourseDto);
  }

  @Roles(UserRoles.Teacher)
  @Post(':id/lesson/create')
  async createLesson(
    @Param('id') id: string,
    @Body() { userId }: { userId: string },
    @Body() createLessonDto: CreateLessonDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.lessonService.create(id, {
      ...createLessonDto,
      creatorId: new mongoose.Types.ObjectId(userId),
    });
  }

  @Get(':id/lesson')
  findAllLesson(@Param('id') id: string) {
    return this.lessonService.findAll(id);
  }

  @Get(':id/lesson/:lessonId')
  findOneLesson(@Param('lessonId') lessonId: string) {
    return this.lessonService.findOne(lessonId);
  }

  @Patch(':id/lesson/:lessonId')
  updateLesson(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    return this.lessonService.update(id, updateCourseDto);
  }

  @Roles(UserRoles.User)
  @Post(':id/enrollment/create')
  async createEnrollment(
    @Param('id') id: string,
    @Body() { userId }: { userId: string },
    @CurrentUser() user: User,
  ) {
    return await this.lessonService.createEnrollment(id, userId);
  }
}
