import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseProgressionDto } from './create-course-progression.dto';

export class UpdateCourseProgressionDto extends PartialType(CreateCourseProgressionDto) {}
