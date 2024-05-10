import { Injectable } from '@nestjs/common';
import { APIRequestService } from '../api-request.service';
import configData from 'src/config/config';
import { HttpResponse } from 'src/common/interfaces';

@Injectable()
export class CourseManagementService {
  constructor(private readonly apiRequestService: APIRequestService) {}

  courseManagementServiceURL = configData.baseUrls.courseManagementService;

  async findCourseByCourseId(courseId: string): Promise<HttpResponse> {
    try {
      return await this.apiRequestService.sendRequest(
        `${this.courseManagementServiceURL}/courses/${courseId}`,
        'get',
        {},
      );
    } catch (error) {
      console.error(error.response?.data?.message || error);
    }
  }
  async getSteps(courseId: string): Promise<HttpResponse> {
    try {
      return await this.apiRequestService.sendRequest(
        `${this.courseManagementServiceURL}/course-content/${courseId}`,
        'get',
        {},
      );
    } catch (error) {
      console.error(error.response?.data?.message || error);
    }
  }
}
