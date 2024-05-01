import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateCourseProgressionDto } from './dto/create-course-progression.dto';
import { UpdateCourseProgressionDto } from './dto/update-course-progression.dto';
import mongoose, { Model } from 'mongoose';
import { CourseProgression } from './interfaces/course-progression.interface';

@Injectable()
export class CourseProgressionService {
  constructor(
    @Inject('COURSE-PROGRESSION_MODEL')
    private courseProgressionModel: Model<CourseProgression>,
  ) {
    mongoose.set('debug', true);
  }

  async create(
    createCourseProgressionDto: CreateCourseProgressionDto,
  ): Promise<CourseProgression> {
    const queriedCourseProgression = this.courseProgressionModel.findOne({
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

  findAll() {
    return `This action returns all courseProgression`;
  }

  findOne(id: string) {
    return `This action returns a #${id} courseProgression`;
  }

  update(id: string, updateCourseProgressionDto: UpdateCourseProgressionDto) {
    return `This action updates a #${id} courseProgression`;
  }

  remove(id: string) {
    return `This action removes a #${id} courseProgression`;
  }
}
