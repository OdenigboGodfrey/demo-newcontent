import { Test, TestingModule } from '@nestjs/testing';
import { NewcontentController } from './newcontent.controller';
import { NewcontentService } from './newcontent.service';

describe('NewcontentController', () => {
  let controller: NewcontentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewcontentController],
      providers: [NewcontentService],
    })
      .overrideProvider(NewcontentService)
      .useValue({})
      .compile();

    controller = module.get<NewcontentController>(NewcontentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
