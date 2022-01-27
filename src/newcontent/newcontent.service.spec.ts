import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { NewContentDTO } from '../../src/dto/newcontent.dto';
import { statusEnum } from '../../src/enums/util.enum';
import { NewcontentService } from './newcontent.service';

describe('NewcontentService', () => {
  let service: NewcontentService;
  const replacedHTML =
    '<p>Hello World<h2>Thwas was a test ran</h2><h3>was System ranning fine?</h3></>p';
  const dataSet: NewContentDTO = {
    Html_content:
      '<p>Hello World<h2>This is a test run</h2><h3>is System running fine?</h3></>p',
    Replace: [
      { value: 'run', toBeReplacedWith: 'ran' },
      { value: 'is', toBeReplacedWith: 'was' },
    ],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NewcontentService,
        {
          provide: 'NewContentModel',
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<NewcontentService>(NewcontentService);
  });

  it('should replace content', () => {
    const result = service.replaceStringContent(dataSet);
    expect(result.code).toEqual(statusEnum.ok);
    expect(result.data).toEqual(replacedHTML);
  });
  it('should write to file content', async () => {
    const id = randomUUID();
    const result = await service.writeToFile(id, dataSet.Html_content);
    const fileName = service.getFileName(id);
    expect(result.code).toEqual(statusEnum.ok);
    expect(result.data).toContain(fileName.data);
    expect(fileName.code).toEqual(statusEnum.ok);
  });
  it('should get the file successfully', async () => {
    const id = randomUUID();
    const result = await service.writeToFile(id, dataSet.Html_content);
    const getResult = await service.readFromFile(result.data);
    expect(getResult.code).toEqual(statusEnum.ok);
    expect(getResult.data).toEqual(replacedHTML);
  });
});
