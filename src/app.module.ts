import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CourseProgressionModule } from './course-progression/course-progression.module';

@Module({
  imports: [CourseProgressionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
