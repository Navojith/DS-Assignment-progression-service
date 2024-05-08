import { Module } from '@nestjs/common';
import { CourseProgressionService } from './course-progression.service';
import { CourseProgressionController } from './course-progression.controller';
import { courseProgressionProviders } from './course-progression.providers';
import { DatabaseModule } from 'src/db/db.module';
import { CourseManagementModule } from 'src/common/services/course-management-service/course.management.service.module.';
import { AuthModule } from 'src/common/services/auth-service/auth.service.module';
import { NotificationModule } from 'src/common/services/notification-service/notification.service.module.';

@Module({
  imports: [
    DatabaseModule,
    CourseManagementModule,
    AuthModule,
    NotificationModule,
  ],
  controllers: [CourseProgressionController],
  providers: [CourseProgressionService, ...courseProgressionProviders],
})
export class CourseProgressionModule {}
