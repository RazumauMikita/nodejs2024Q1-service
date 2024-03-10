import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Header,
  HttpStatus,
  HttpException,
  Put,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { validate } from 'uuid';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  findOne(@Param('id') id: string) {
    if (!validate(id)) {
      throw new HttpException('albumId is invalid', HttpStatus.BAD_REQUEST);
    }
    const album = this.albumService.findOne(id);
    if (!album) {
      throw new HttpException("Album doesn't exist", HttpStatus.NOT_FOUND);
    }
    return album;
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    if (!validate(id)) {
      throw new HttpException('albumId is invalid', HttpStatus.BAD_REQUEST);
    }
    const response = this.albumService.update(id, updateAlbumDto);
    if (!response) {
      throw new HttpException("Album doesn't exist", HttpStatus.NOT_FOUND);
    }
    return response;
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    if (!validate(id)) {
      throw new HttpException('albumId is invalid', HttpStatus.BAD_REQUEST);
    }
    const response = this.albumService.remove(id);
    if (!response) {
      throw new HttpException("Album doesn't exist", HttpStatus.NOT_FOUND);
    }
    return response;
  }
}
