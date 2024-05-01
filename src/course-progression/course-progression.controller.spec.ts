import { Test, TestingModule } from '@nestjs/testing';
import { CourseProgressionController } from './course-progression.controller';
import { CourseProgressionService } from './course-progression.service';

describe('CourseProgressionController', () => {
  let controller: CourseProgressionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseProgressionController],
      providers: [CourseProgressionService],
    }).compile();

    controller = module.get<CourseProgressionController>(CourseProgressionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
