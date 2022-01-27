import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NewcontentController } from './newcontent.controller';
import { NewContent, NewContentSchema } from './newcontent.model';
import { NewcontentService } from './newcontent.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: NewContent.name, schema: NewContentSchema },
    ]),
  ],
  controllers: [NewcontentController],
  providers: [NewcontentService],
})
export class NewcontentModule {}
