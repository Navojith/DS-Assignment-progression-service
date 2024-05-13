import { Injectable } from '@nestjs/common';
import { APIRequestService } from '../api-request.service';
import configData from 'src/config/config';
import { HttpResponse } from 'src/common/interfaces';

@Injectable()
export class AuthService {
  constructor(private readonly apiRequestService: APIRequestService) {}

  authServiceURL = configData.baseUrls.authService;

  async findUserById(userId: string): Promise<HttpResponse> {
    try {
      const res = await this.apiRequestService.sendRequest(
        `${this.authServiceURL}/user/findOneById/${userId}`,
        'get',
        {},
      );
      if (!res) {
        return { statusCode: 404, data: null };
      }
      return res;
    } catch (error) {
      throw error;
    }
  }
}
