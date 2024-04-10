import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/common';
import { Course } from '../models/course.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CourseRepository extends AbstractRepository<Course> {
  protected readonly logger: Logger = new Logger(CourseRepository.name);
  constructor(
    @InjectModel(Course.name)
    private courseModel: Model<Course>,
  ) {
    super(courseModel);
  }
}
