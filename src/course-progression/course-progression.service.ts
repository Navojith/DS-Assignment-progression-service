import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateCourseProgressionDto } from './dto/create-course-progression.dto';
import { UpdateCourseProgressionDto } from './dto/update-course-progression.dto';
import mongoose, { Model } from 'mongoose';
import { CourseProgression } from './interfaces/course-progression.interface';
import { CourseManagementService } from 'src/common/services/course-management-service/course.management.service';
import { AuthService } from 'src/common/services/auth-service/auth.service';
import { NotificationService } from 'src/common/services/notification-service/notification.service';
import { NOTIFICATION_TYPES } from 'src/common/constants';

@Injectable()
export class CourseProgressionService {
  constructor(
    @Inject('COURSE_PROGRESSION_MODEL')
    private courseProgressionModel: Model<CourseProgression>,
    private readonly courseManagementService: CourseManagementService,
    private readonly authService: AuthService,
    private readonly notificationService: NotificationService,
  ) {
    mongoose.set('debug', true);
  }

  async create(
    createCourseProgressionDto: CreateCourseProgressionDto,
  ): Promise<CourseProgression> {
    try {
      const queriedCourseProgression =
        await this.courseProgressionModel.findOne({
          courseId: createCourseProgressionDto.courseId,
          userId: createCourseProgressionDto.userId,
        });

      if (queriedCourseProgression) {
        throw new HttpException(
          `Entry with User ID: '${createCourseProgressionDto.userId}', Course ID: '${createCourseProgressionDto.courseId}' already exists`,
          HttpStatus.CONFLICT,
        );
      }

      const coursePromise = this.courseManagementService.findCourseByCourseId(
        createCourseProgressionDto.courseId,
      );

      const userPromise = this.authService.findUserById(
        createCourseProgressionDto.userId,
      );
      const [course, user] = await Promise.all([coursePromise, userPromise]);

      if (course?.statusCode === 200 && user?.statusCode === 200) {
        const createdEntry = await this.courseProgressionModel.create({
          courseId: createCourseProgressionDto.courseId,
          userId: createCourseProgressionDto.userId,
          completedSteps: createCourseProgressionDto.completedSteps,
        });

        if (createdEntry) {
          if (
            user?.data?.email &&
            course?.data?.name &&
            course?.data?.courseId
          ) {
            try {
              const response = await this.notificationService.sendEmail({
                type: NOTIFICATION_TYPES.course_registration,
                email: user?.data?.email,
                courseId: course?.data?.courseId,
                courseName: course?.data?.name,
              });

              if (response?.statusCode !== 200) {
                console.error(response);
              }
            } catch (err) {
              throw err;
            }
          }
          if (user?.data?.phoneNumber) {
            try {
              const response = await this.notificationService.sendSMS({
                type: NOTIFICATION_TYPES.course_registration,
                receiver: user?.data?.phoneNumber,
                courseName: course?.data?.name,
              });

              if (response?.statusCode !== 200) {
                console.error(response);
              }
            } catch (err) {
              throw err;
            }
          }
          return createdEntry;
        }
      }
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error?.response?.data?.message || error?.message,
        error?.response?.data?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<CourseProgression[]> {
    try {
      const items = await this.courseProgressionModel.find();
      if (!items) {
        throw new HttpException('No items found', HttpStatus.NOT_FOUND);
      }
      return items;
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(userId: string, courseId: string): Promise<CourseProgression> {
    try {
      if (!userId || !courseId) {
        throw new HttpException(
          'userId and courseId required',
          HttpStatus.BAD_REQUEST,
        );
      }
      const item = await this.courseProgressionModel.findOne({
        courseId,
        userId,
      });
      if (!item) {
        throw new HttpException('No item found', HttpStatus.NOT_FOUND);
      }
      return item;
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAllByUserId(userId: string): Promise<CourseProgression[]> {
    try {
      if (!userId) {
        throw new HttpException('userId required', HttpStatus.BAD_REQUEST);
      }
      const items = await this.courseProgressionModel.find({
        userId,
      });
      if (!items) {
        throw new HttpException('No items found', HttpStatus.NOT_FOUND);
      }
      return items;
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(
    userId: string,
    courseId: string,
    updateCourseProgressionDto: UpdateCourseProgressionDto,
  ): Promise<CourseProgression> {
    try {
      const item = await this.courseProgressionModel.findOne({
        courseId,
        userId,
      });
      if (!item) {
        throw new HttpException('No item found', HttpStatus.NOT_FOUND);
      }

      if (
        updateCourseProgressionDto.userId !== userId ||
        updateCourseProgressionDto.courseId !== courseId
      ) {
        const updating = await this.courseProgressionModel.findOne({
          courseId: updateCourseProgressionDto.courseId,
          userId: updateCourseProgressionDto.userId,
        });
        if (updating) {
          throw new HttpException(
            `Entry with User ID: '${updateCourseProgressionDto.userId || userId}', Course ID: '${updateCourseProgressionDto.courseId || userId}' already exists`,
            HttpStatus.CONFLICT,
          );
        }
      }

      item.courseId = updateCourseProgressionDto.courseId ?? item.courseId;
      item.userId = updateCourseProgressionDto.userId ?? item.userId;
      item.completedSteps =
        updateCourseProgressionDto.completedSteps ?? item.completedSteps ?? 0;

      const coursePromise = this.courseManagementService.findCourseByCourseId(
        item.courseId,
      );

      const userPromise = this.authService.findUserById(item.userId);
      const [course, user] = await Promise.all([coursePromise, userPromise]);

      if (course?.statusCode === 200 || user?.statusCode === 200) {
        await item.save();
        return item;
      }
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error?.response?.data?.message || error?.message,
        error?.response?.data?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(userId: string, courseId: string): Promise<CourseProgression> {
    try {
      const item = await this.courseProgressionModel.findOneAndDelete({
        courseId,
        userId,
      });
      if (!item) {
        throw new HttpException('No item found', HttpStatus.NOT_FOUND);
      }
      return item;
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
