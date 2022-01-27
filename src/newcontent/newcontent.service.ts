import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NewContentDTO } from './../dto/newcontent.dto';
import { ResponseDTO } from './../dto/response.dto';
import {
  NewContent,
  NewContentDocument,
  NewContentSchema,
} from './newcontent.model';
import fs from 'fs';
import { randomUUID } from 'crypto';
import { statusEnum } from './../enums/util.enum';
import { join } from 'path';
import e, { response } from 'express';

@Injectable()
export class NewcontentService {
  /***
   * import model,
   * connect model to db
   * create service
   * get service
   * create: replace contents that are passed in params
   * create: save content to file
   * create: save file path to db with status
   * get: pick file and return
   */
  constructor(
    @InjectModel(NewContent.name)
    private readonly model: Model<NewContentDocument>,
  ) {
    this.fs = require('fs');
    this.os = require('os');
  }

  fs = undefined;
  os = undefined;

  async create(data: NewContentDTO): Promise<ResponseDTO> {
    const response = new ResponseDTO();
    try {
      /**
       * Replace all mentions of value in v
       */
      const id = randomUUID();

      // data.Replace.map((x) => {
      //   const re = new RegExp(x.value, 'g');
      //   data.Html_content = data.Html_content.replace(re, x.toBeReplacedWith);
      // });
      const htmlContent = this.replaceStringContent(data);
      if (htmlContent.code >= statusEnum.ok) {
        const logpath = this.writeToFile(id, data.Html_content);
        if (logpath.code >= statusEnum.ok) {
          const fileData = new this.model({
            uuid: id,
            filePath: logpath.data,
            status: 'created',
            created_at: new Date(),
          });
          await fileData.save();
          //write to file
          //
          response.code = statusEnum.successful;
          response.data = { id: id, path: logpath.data };
        } else {
          response.code = logpath.code;
          response.extra_data = logpath.extra_data;
        }
      } else {
        response.code = htmlContent.code;
        response.extra_data = htmlContent.extra_data;
      }
    } catch (e) {
      response.extra_data = e;
    }
    return response.getResponse();
  }

  replaceStringContent(sourceDataset: NewContentDTO): ResponseDTO {
    const response: ResponseDTO = new ResponseDTO();
    try {
      sourceDataset.Replace.map((x) => {
        const re = new RegExp(x.value, 'g');
        sourceDataset.Html_content = sourceDataset.Html_content.replace(
          re,
          x.toBeReplacedWith,
        );
      });
      response.data = sourceDataset.Html_content;
      response.code = statusEnum.ok;
    } catch (e) {
      response.extra_data = e.toString();
    }
    return response;
  }

  getFileName(id: string): ResponseDTO {
    const response = new ResponseDTO();
    try {
      const home = this.os.homedir();
      let logpath = home + '/Documents/';
      logpath = join(__dirname, '../../', 'public/');
      response.data = `${logpath}${id.replace(/-/g, '_')}.html`;
      response.code = statusEnum.ok;
    } catch (e) {
      response.extra_data = e.toString();
    }
    return response;
  }

  writeToFile(id: string, content: string): ResponseDTO {
    const response = new ResponseDTO();
    let logpath = '';
    try {
      const fileName = this.getFileName(id);
      if (fileName.code >= statusEnum.ok) {
        logpath = `${fileName.data}`;
        this.fs.writeFileSync(`${logpath}`, content);
        response.data = logpath;
        response.code = statusEnum.ok;
      }
    } catch (e) {
      response.extra_data = e.toString();
    }
    return response;
  }

  readFromFile(filePath: string): ResponseDTO {
    const response = new ResponseDTO();
    try {
      const content = this.fs.readFileSync(filePath, 'utf8');
      response.data = content;
      response.code = statusEnum.ok;
    } catch (e) {
      response.extra_data = e.toString();
    }

    return response;
  }

  async get(id: string): Promise<ResponseDTO> {
    const response = new ResponseDTO();
    try {
      /**
       * get file path and return
       */
      const fileData = await this.model.findOne({ uuid: id });
      if (fileData == null) {
        response.message = 'id for file not found';
      } else {
        response.code = statusEnum.successful;
        // response.data = fileData.filePath.toString();
        const content = this.readFromFile(fileData.filePath.toString());
        if (content.code >= statusEnum.ok) {
          response.data = content.data;
        } else {
          response.extra_data = content.extra_data;
        }
      }
    } catch (e) {
      response.extra_data = e;
    }
    return response.getResponse();
  }
}
