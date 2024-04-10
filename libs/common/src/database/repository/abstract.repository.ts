import { AbstractDocument } from '@app/common/database/models/abstract.schema';
import {
  FilterQuery,
  Model,
  ProjectionType,
  Types,
  UpdateQuery,
} from 'mongoose';
import { Logger, NotFoundException } from '@nestjs/common';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;
  constructor(protected readonly model: Model<TDocument>) {}
  async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    const createdDocument = await this.model.create({
      ...document,
      _id: new Types.ObjectId(),
    });
    return createdDocument.toJSON() as unknown as TDocument;
  }

  async findOne(
    filterQuery: FilterQuery<TDocument>,
    projection?: ProjectionType<TDocument> | null | undefined,
  ) {
    const document = await this.model.findOne(filterQuery, projection, { lean: true });
    if (!document) {
      this.logger.warn('Document Not Found with this filterQuery', filterQuery);
      throw new NotFoundException('Document Not Found!');
    }
    return document;
  }
  async find(
    filterQuery: FilterQuery<TDocument>,
    projection?: ProjectionType<TDocument> | null | undefined,
  ) {
    return this.model.find(filterQuery, projection, { lean: true });
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    updateQuery: UpdateQuery<TDocument>,
  ) {
    const document = await this.model.findOneAndUpdate(
      filterQuery,
      updateQuery,
      { lean: true, new: true },
    );
    if (!document) {
      this.logger.warn('Document Not Found with this filterQuery', filterQuery);
      throw new NotFoundException('Document Not Found!');
    }
    return document;
  }

  async findOneAndDelete(filterQuery: FilterQuery<TDocument>) {
    return this.model.findOneAndDelete(filterQuery, { lean: true });
  }
}
