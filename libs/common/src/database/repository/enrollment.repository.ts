import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Enrollment } from '../models/enrollment.schema';

@Injectable()
export class EnrollmentRepository extends AbstractRepository<Enrollment> {
  protected readonly logger: Logger = new Logger(EnrollmentRepository.name);
  constructor(
    @InjectModel(Enrollment.name)
    private enrollmentModel: Model<Enrollment>,
  ) {
    super(enrollmentModel);
  }
}
