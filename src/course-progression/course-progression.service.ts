import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateCourseProgressionDto } from './dto/create-course-progression.dto';
import { UpdateCourseProgressionDto } from './dto/update-course-progression.dto';
import mongoose, { Model } from 'mongoose';
import { CourseProgression } from './interfaces/course-progression.interface';

@Injectable()
export class CourseProgressionService {
  constructor(
    @Inject('COURSE_PROGRESSION_MODEL')
    private courseProgressionModel: Model<CourseProgression>,
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

      const createdEntry = await this.courseProgressionModel.create({
        courseId: createCourseProgressionDto.courseId,
        userId: createCourseProgressionDto.userId,
        completedSteps: createCourseProgressionDto.completedSteps,
      });

      return createdEntry;
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
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
      await item.save();
      return item;
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
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
