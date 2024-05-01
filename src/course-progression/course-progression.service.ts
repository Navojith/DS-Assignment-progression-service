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
    const queriedCourseProgression = await this.courseProgressionModel.findOne({
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
  }

  async findAll(): Promise<CourseProgression[]> {
    const items = await this.courseProgressionModel.find();
    if (!items) {
      throw new HttpException('No items found', HttpStatus.NOT_FOUND);
    }
    return items;
  }

  async findOne(userId: string, courseId: string): Promise<CourseProgression> {
    const item = await this.courseProgressionModel.findOne({
      courseId,
      userId,
    });
    if (!item) {
      throw new HttpException('No item found', HttpStatus.NOT_FOUND);
    }
    return item;
  }

  update(id: string, updateCourseProgressionDto: UpdateCourseProgressionDto) {
    return `This action updates a #${id} courseProgression`;
  }

  remove(id: string) {
    return `This action removes a #${id} courseProgression`;
  }
}
