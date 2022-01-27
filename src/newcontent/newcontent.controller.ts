import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import {
  ApiOperation,
  ApiProduces,
  ApiResponse,
  ApiConsumes,
} from '@nestjs/swagger';
import { NewContentDTO } from 'src/dto/newcontent.dto';
import { ResponseDTO } from 'src/dto/response.dto';
import { statusEnum } from 'src/enums/util.enum';
import { NewcontentService } from './newcontent.service';

@Controller('newcontent')
export class NewcontentController {
  constructor(private service: NewcontentService) {}
  @ApiOperation({
    description: 'create a new file',
  })
  @ApiProduces('json')
  @ApiResponse({
    type: ResponseDTO,
  })
  @ApiConsumes('application/json', 'multipart/form-data')
  @Post('create')
  async create(@Body() payload: NewContentDTO) {
    const response = await this.service.create(payload);
    console.log(response);
    return response;
  }

  @ApiOperation({
    description: 'gets a created file',
  })
  @ApiProduces('json')
  @ApiResponse({
    type: '',
  })
  @ApiConsumes('application/json', 'multipart/form-data')
  @Get('get/webview/:id')
  async get(@Param('id') id: string) {
    const response = await this.service.get(id);
    console.log(response);
    if (response.code < statusEnum.ok) {
      return response;
    }
    return response.data;
  }
}
