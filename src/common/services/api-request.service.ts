import { ForbiddenException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { HttpHeaders, HttpResponse } from '../interfaces';
import { catchError, map } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class APIRequestService {
  constructor(private readonly httpService: HttpService) {}

  async sendRequest(
    url: string,
    method: string = 'post',
    headers: HttpHeaders,
    params: any = {},
    body?: any,
  ) {
    try {
      const options = {
        headers,
        params,
        data: body,
      };

      const response = await firstValueFrom(
        this.httpService
          .request({
            method,
            url,
            ...options,
          })
          .pipe(
            map(
              (res) =>
                ({ data: res.data, statusCode: res.status }) as HttpResponse,
            ),
            catchError((err) => {
              if (err instanceof ForbiddenException) {
                throw new ForbiddenException('API not available');
              } else {
                throw err;
              }
            }),
          ),
      );

      return response;
    } catch (error) {
      throw error;
    }
  }
}
