import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CourseProgressionModule } from './course-progression/course-progression.module';

@Module({
  imports: [ConfigModule.forRoot(), CourseProgressionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
