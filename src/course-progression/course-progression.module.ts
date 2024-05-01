import { Module } from '@nestjs/common';
import { CourseProgressionService } from './course-progression.service';
import { CourseProgressionController } from './course-progression.controller';

@Module({
  controllers: [CourseProgressionController],
  providers: [CourseProgressionService],
})
export class CourseProgressionModule {}
