import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpException,
  HttpStatus,
  Header,
  Put,
} from '@nestjs/common';
import { validate } from 'uuid';

import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  @HttpCode(201)
  @Header('Content-Type', 'application/json')
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  findOne(@Param('id') id: string) {
    if (!validate(id)) {
      throw new HttpException('artistId is invalid', HttpStatus.BAD_REQUEST);
    }
    const artist = this.artistService.findOne(id);
    if (!artist) {
      throw new HttpException("Artist doesn't exist", HttpStatus.NOT_FOUND);
    }
    return artist;
  }

  @Put(':id')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  update(@Param('id') id: string, @Body() updateArtistDto: UpdateArtistDto) {
    if (!validate(id)) {
      throw new HttpException('artistId is invalid', HttpStatus.BAD_REQUEST);
    }
    return this.artistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    if (!validate(id)) {
      throw new HttpException('artistId is invalid', HttpStatus.BAD_REQUEST);
    }
    await this.artistService.remove(id);
  }
}
