import { Test, TestingModule } from '@nestjs/testing';
import { SingleCourseController } from './single-course.controller';

describe('SingleCourse Controller', () => {
  let controller: SingleCourseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SingleCourseController]
    }).compile();

    controller = module.get<SingleCourseController>(SingleCourseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
