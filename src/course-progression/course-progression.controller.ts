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
  async create(@Body() createCourseProgressionDto: CreateCourseProgressionDto) {
    return await this.courseProgressionService.create(
      createCourseProgressionDto,
    );
  }

  @Post('create-and-send-sms')
  async createAndSendSms(
    @Body() createCourseProgressionDto: CreateCourseProgressionDto,
  ) {
    return await this.courseProgressionService.createSendSms(
      createCourseProgressionDto,
    );
  }

  @Get()
  async findAll() {
    return await this.courseProgressionService.findAll();
  }

  @Get(':userId/:courseId')
  async findOne(
    @Param('userId') userId: string,
    @Param('courseId') courseId: string,
  ) {
    return this.courseProgressionService.findOne(userId, courseId);
  }

  @Get(':userId')
  async getAllByUserId(@Param('userId') userId: string) {
    return await this.courseProgressionService.getAllByUserId(userId);
  }

  @Patch(':userId/:courseId')
  async update(
    @Param('userId') userId: string,
    @Param('courseId') courseId: string,
    @Body() updateCourseProgressionDto: UpdateCourseProgressionDto,
  ) {
    return await this.courseProgressionService.update(
      userId,
      courseId,
      updateCourseProgressionDto,
    );
  }

  @Delete(':userId/:courseId')
  async remove(
    @Param('userId') userId: string,
    @Param('courseId') courseId: string,
  ) {
    return await this.courseProgressionService.remove(userId, courseId);
  }
}
