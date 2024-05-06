import { Module } from '@nestjs/common';
import { APIRequestService } from '../api-request.service';
import { HttpModule } from '@nestjs/axios';
import { CourseManagementService } from './course.management.service';

@Module({
  imports: [HttpModule],
  providers: [CourseManagementService, APIRequestService],
  exports: [CourseManagementService],
})
export class CourseManagementModule {}
