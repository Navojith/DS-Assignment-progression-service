import { Injectable } from '@nestjs/common';
import { APIRequestService } from '../api-request.service';
import configData from 'src/config/config';
import { HttpResponse } from 'src/common/interfaces';

@Injectable()
export class NotificationService {
  constructor(private readonly apiRequestService: APIRequestService) {}

  notificationServiceURL = configData.baseUrls.notificationsService;

  async sendEmail(body: {
    type: string;
    email: string;
    name?: string;
    courseId?: string;
    courseName?: string;
    context?: string;
  }): Promise<HttpResponse> {
    try {
      return await this.apiRequestService.sendRequest(
        `${this.notificationServiceURL}/email-service`,
        'post',
        {},
        {},
        body,
      );
    } catch (error) {
      throw error;
    }
  }

  async sendSMS(body: { type: string; receiver: string; courseName?: string }) {
    try {
      return await this.apiRequestService.sendRequest(
        `${this.notificationServiceURL}/text-message-service`,
        'post',
        {},
        {},
        body,
      );
    } catch (error) {
      throw error;
    }
  }
}
