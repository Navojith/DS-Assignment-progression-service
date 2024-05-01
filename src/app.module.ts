import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CourseProgressionModule } from './course-progression/course-progression.module';

@Module({
  imports: [ConfigModule.forRoot(), CourseProgressionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
