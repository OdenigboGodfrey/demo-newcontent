import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { statusEnum } from './../enums/util.enum';

export class ResponseDTO {
  status = false;
  data: any = [];
  message = '';
  extra_data: any[] = [];
  code: number = statusEnum.failed;

  getResponse = () => {
    this.status = this.code > statusEnum.failed;
    if (this.code == statusEnum.error) {
      this.message = 'An error occured';
      throw new InternalServerErrorException(this);
    }
    if (!this.status) throw new BadRequestException(this);

    return this;
  };
}
