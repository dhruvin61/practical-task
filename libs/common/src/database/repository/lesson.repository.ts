import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lesson } from '../models/lesson.schema';

@Injectable()
export class LessonRepository extends AbstractRepository<Lesson> {
  protected readonly logger: Logger = new Logger(LessonRepository.name);
  constructor(
    @InjectModel(Lesson.name)
    private lessonModel: Model<Lesson>,
  ) {
    super(lessonModel);
  }
}
