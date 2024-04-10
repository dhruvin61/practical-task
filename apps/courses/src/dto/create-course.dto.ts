import { IsDate, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCourseDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

}
