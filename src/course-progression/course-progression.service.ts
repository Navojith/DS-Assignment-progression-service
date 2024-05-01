import { Injectable } from '@nestjs/common';
import { CreateCourseProgressionDto } from './dto/create-course-progression.dto';
import { UpdateCourseProgressionDto } from './dto/update-course-progression.dto';

@Injectable()
export class CourseProgressionService {
  create(createCourseProgressionDto: CreateCourseProgressionDto) {
    return 'This action adds a new courseProgression';
  }

  findAll() {
    return `This action returns all courseProgression`;
  }

  findOne(id: number) {
    return `This action returns a #${id} courseProgression`;
  }

  update(id: number, updateCourseProgressionDto: UpdateCourseProgressionDto) {
    return `This action updates a #${id} courseProgression`;
  }

  remove(id: number) {
    return `This action removes a #${id} courseProgression`;
  }
}
