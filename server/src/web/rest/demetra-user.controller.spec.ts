import { Test, TestingModule } from '@nestjs/testing';
import { DemetraUserController } from './demetra-user.controller';

describe('DemetraUser Controller', () => {
  let controller: DemetraUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DemetraUserController]
    }).compile();

    controller = module.get<DemetraUserController>(DemetraUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
