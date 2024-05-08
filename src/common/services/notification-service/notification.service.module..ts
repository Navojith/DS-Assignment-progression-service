import { Module } from '@nestjs/common';
import { APIRequestService } from '../api-request.service';
import { HttpModule } from '@nestjs/axios';
import { NotificationService } from './notification.service';

@Module({
  imports: [HttpModule],
  providers: [NotificationService, APIRequestService],
  exports: [NotificationService],
})
export class NotificationModule {}
