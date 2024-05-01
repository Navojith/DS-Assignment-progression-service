import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CourseProgressionService } from './course-progression.service';
import { CreateCourseProgressionDto } from './dto/create-course-progression.dto';
import { UpdateCourseProgressionDto } from './dto/update-course-progression.dto';

@Controller('course-progression')
export class CourseProgressionController {
  constructor(
    private readonly courseProgressionService: CourseProgressionService,
  ) {}

  @Post()
  create(@Body() createCourseProgressionDto: CreateCourseProgressionDto) {
    return this.courseProgressionService.create(createCourseProgressionDto);
  }

  @Get()
  findAll() {
    return this.courseProgressionService.findAll();
  }

  @Get(':userId/:courseId')
  findOne(
    @Param('userId') userId: string,
    @Param('courseId') courseId: string,
  ) {
    return this.courseProgressionService.findOne(userId, courseId);
  }

  @Patch(':userId/:courseId')
  update(
    @Param('id') id: string,
    @Body() updateCourseProgressionDto: UpdateCourseProgressionDto,
  ) {
    return this.courseProgressionService.update(id, updateCourseProgressionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseProgressionService.remove(id);
  }
}
