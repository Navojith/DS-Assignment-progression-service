import { Module } from '@nestjs/common';
import { CourseProgressionService } from './course-progression.service';
import { CourseProgressionController } from './course-progression.controller';
import { courseProgressionProviders } from './course-progression.providers';
import { DatabaseModule } from 'src/db/db.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CourseProgressionController],
  providers: [CourseProgressionService, ...courseProgressionProviders],
})
export class CourseProgressionModule {}
