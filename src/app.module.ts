import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewcontentService } from './newcontent/newcontent.service';
import { NewcontentController } from './newcontent/newcontent.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { NewcontentModule } from './newcontent/newcontent.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      //'mongodb://localhost:27017/email_service_db'
      'mongodb://162.0.230.238:27017/email_service_db',
      { autoCreate: true },
    ),
    NewcontentModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'), // <-- path to the static files
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
