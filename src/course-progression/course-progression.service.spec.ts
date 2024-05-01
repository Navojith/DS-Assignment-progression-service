import { Test, TestingModule } from '@nestjs/testing';
import { CourseProgressionService } from './course-progression.service';

describe('CourseProgressionService', () => {
  let service: CourseProgressionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourseProgressionService],
    }).compile();

    service = module.get<CourseProgressionService>(CourseProgressionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
