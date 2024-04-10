import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import mongoose from 'mongoose';
import { LessonRepository } from '@app/common/database/repository/lesson.repository';
import { UpdateLessonDto } from '../dto/update-lesson.dto';
import { Lesson } from '@app/common/database/models/lesson.schema';
import { CourseRepository } from '@app/common/database/repository/courses.repository';
import { CreateLessonDto } from '../dto/create-lesson.dto';
import { EnrollmentRepository } from '@app/common/database/repository/enrollment.repository';
import { UserRepository } from '@app/common/database/repository/user.repository';
import { Enrollment } from '@app/common/database/models/enrollment.schema';

@Injectable()
export class LessonService {
  constructor(
    private lessonRepository: LessonRepository,
    private courseRepository: CourseRepository,
    private enrollmentRepository: EnrollmentRepository,
    private userRepository: UserRepository,
  ) {}
  async create(
    courseId: string,
    createLessonDto: CreateLessonDto & { creatorId: mongoose.Types.ObjectId },
  ) {
    const course = await this.courseRepository.findOne({
      _id: new mongoose.Types.ObjectId(courseId),
    });
    if (!course) {
      throw new NotFoundException('Course not found');
    }

    const lesson: Lesson = await this.lessonRepository.create({
      ...createLessonDto,
      courseId: course._id,
    });

    await this.courseRepository.findOneAndUpdate(
      { _id: course._id },
      {
        $push: { lessons: lesson._id },
      },
    );
    return lesson;
  }

  findAll(courseId: string | mongoose.Types.ObjectId) {
    if (typeof courseId === 'string') {
      courseId = new mongoose.Types.ObjectId(courseId);
    }
    return this.lessonRepository.find({ courseId });
  }

  findOne(id: string | mongoose.Types.ObjectId) {
    if (typeof id === 'string') {
      id = new mongoose.Types.ObjectId(id);
    }
    return this.lessonRepository.findOne({ _id: id });
  }

  update(
    id: string | mongoose.Types.ObjectId,
    updateLessonDto: UpdateLessonDto,
  ) {
    if (typeof id === 'string') {
      id = new mongoose.Types.ObjectId(id);
    }
    return this.lessonRepository.findOneAndUpdate(
      { _id: id },
      { $set: { ...updateLessonDto } },
    );
  }

  async createEnrollment(
    courseId: string | mongoose.Types.ObjectId,
    userId: string | mongoose.Types.ObjectId,
  ) {
    const [course, user] = await Promise.all([
      this.courseRepository.findOne({
        _id: new mongoose.Types.ObjectId(courseId),
      }),
      this.userRepository.findOne({
        _id: new mongoose.Types.ObjectId(userId),
      }),
    ]);
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const enrollmentInput = {
      courseId: course._id,
      userId: user._id,
    };
    const enrollment = await this.enrollmentRepository.create(enrollmentInput);
    return enrollment;
  }
}
