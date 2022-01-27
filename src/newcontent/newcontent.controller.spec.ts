import { Test, TestingModule } from '@nestjs/testing';
import { NewcontentController } from './newcontent.controller';

describe('NewcontentController', () => {
  let controller: NewcontentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewcontentController],
    }).compile();

    controller = module.get<NewcontentController>(NewcontentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
