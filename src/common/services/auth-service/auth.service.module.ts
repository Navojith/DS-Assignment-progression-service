import { Module } from '@nestjs/common';
import { APIRequestService } from '../api-request.service';
import { HttpModule } from '@nestjs/axios';
import { AuthService } from './auth.service';

@Module({
  imports: [HttpModule],
  providers: [AuthService, APIRequestService],
  exports: [AuthService],
})
export class AuthModule {}
