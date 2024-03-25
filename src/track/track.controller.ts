import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  HttpCode,
  Header,
  Put,
} from '@nestjs/common';
import { validate } from 'uuid';

import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  create(@Body() createTrackDto: CreateTrackDto) {
    if (createTrackDto.albumId) {
      if (!validate(createTrackDto.albumId)) {
        throw new HttpException('albumId is invalid', HttpStatus.BAD_REQUEST);
      }
    }

    return this.trackService.create(createTrackDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  findOne(@Param('id') id: string) {
    if (!validate(id)) {
      throw new HttpException('trackId is invalid', HttpStatus.BAD_REQUEST);
    }
    return this.trackService.findOne(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  update(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
    if (!validate(id)) {
      throw new HttpException('trackId is invalid', HttpStatus.BAD_REQUEST);
    }
    return this.trackService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    if (!validate(id)) {
      throw new HttpException('trackId is invalid', HttpStatus.BAD_REQUEST);
    }

    return await this.trackService.remove(id);
  }
}
