import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from '../dto/create-course.dto';
import { UpdateCourseDto } from '../dto/update-course.dto';
import { CourseRepository } from '../../../../libs/common/src/database/repository/courses.repository';
import mongoose, { ObjectId } from 'mongoose';
import { EnrollmentRepository } from '@app/common/database/repository/enrollment.repository';
import { UserRepository } from '@app/common/database/repository/user.repository';
import { LessonRepository } from '@app/common/database/repository/lesson.repository';

@Injectable()
export class CoursesService {
  constructor(
    private courseRepository: CourseRepository,
    private enrollmentRepository: EnrollmentRepository,
    private lessonRepository: LessonRepository,
    private userRepository: UserRepository,
  ) {}
  create(createCourseDto: CreateCourseDto, userId) {
    return this.courseRepository.create({
      ...createCourseDto,
      creatorId: new mongoose.Types.ObjectId(userId),
    });
  }

  createLesson(createCourseDto: CreateCourseDto, user) {
    let lessons = [];
    // if (createCourseDto.lessons) {
    //   lessons = createCourseDto.lessons.map(
    //     (id) => new mongoose.Types.ObjectId(id),
    //   );
    // }
    return this.courseRepository.create({
      ...createCourseDto,
      lessons,
      creatorId: new mongoose.Types.ObjectId(user._id),
    });
  }

  enrollCourse(createCourseDto: CreateCourseDto, user) {
    let lessons = [];
    // if (createCourseDto.lessons) {
    //   lessons = createCourseDto.lessons.map(
    //     (id) => new mongoose.Types.ObjectId(id),
    //   );
    // }
    return this.courseRepository.create({
      ...createCourseDto,
      lessons,
      creatorId: new mongoose.Types.ObjectId(user._id),
    });
  }

  findAll() {
    return this.courseRepository.find({});
  }

  async findOne(id: string) {
    const course = await this.courseRepository.findOne({
      _id: new mongoose.Types.ObjectId(id),
    });
    const lessons = await this.lessonRepository.find({
      _id: { $in: course.lessons },
    });
    course.lessons = lessons;
    const enrollment = await this.enrollmentRepository.find({
      courseId: course._id,
    });
    const userIds = enrollment.map(
      ({ userId }) => userId && new mongoose.Types.ObjectId(userId),
    );
    const users = await this.userRepository.find(
      { _id: { $in: userIds } },
      { password: 0 },
    );
    const creator = await this.userRepository.findOne(
      { _id: course.creatorId },
      { password: 0 },
    );
    return {
      course,
      creator,
      enrolledUsers: users,
    };
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return this.courseRepository.findOneAndUpdate(
      { _id: id },
      { $set: { ...updateCourseDto } },
    );
  }
}
