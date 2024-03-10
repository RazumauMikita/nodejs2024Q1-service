import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  HttpCode,
  Header,
  Put,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { validate } from 'uuid';

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
    if (createTrackDto.artistId) {
      if (!validate(createTrackDto.artistId)) {
        throw new HttpException('artistId is invalid', HttpStatus.BAD_REQUEST);
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
    const track = this.trackService.findOne(id);
    if (!track) {
      throw new HttpException("Track doesn't exist", HttpStatus.NOT_FOUND);
    }
    return track;
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  update(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
    if (!validate(id)) {
      throw new HttpException('trackId is invalid', HttpStatus.BAD_REQUEST);
    }
    const response = this.trackService.update(id, updateTrackDto);
    if (!response) {
      throw new HttpException("Track doesn't exist", HttpStatus.NOT_FOUND);
    }
    return response;
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    if (!validate(id)) {
      throw new HttpException('trackId is invalid', HttpStatus.BAD_REQUEST);
    }

    const response = this.trackService.remove(id);
    if (!response) {
      throw new HttpException("Track doesn't exist", HttpStatus.NOT_FOUND);
    }
    return response;
  }
}
