import { Module } from '@nestjs/common';
import { CourseProgressionService } from './course-progression.service';
import { CourseProgressionController } from './course-progression.controller';
import { courseProgressionProviders } from './course-progression.providers';
import { DatabaseModule } from 'src/db/db.module';
import { CourseManagementModule } from 'src/common/services/course-management-service/course.management.service.module.';
import { AuthModule } from 'src/common/services/auth-service/auth.service.module';

@Module({
  imports: [DatabaseModule, CourseManagementModule, AuthModule],
  controllers: [CourseProgressionController],
  providers: [CourseProgressionService, ...courseProgressionProviders],
})
export class CourseProgressionModule {}
