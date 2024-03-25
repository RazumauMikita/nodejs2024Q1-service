import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Header,
  HttpCode,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { validate } from 'uuid';

import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  async getFavorites() {
    return await this.favoritesService.findAll();
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  addAlbum(@Param('id') id: string) {
    if (!validate(id)) {
      throw new HttpException('albumId is invalid', HttpStatus.BAD_REQUEST);
    }
    return this.favoritesService.addAlbum(id);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Header('Content-Type', 'application/json')
  deleteAlbum(@Param('id') id: string) {
    if (!validate(id)) {
      throw new HttpException('albumId is invalid', HttpStatus.BAD_REQUEST);
    }
    this.favoritesService.removeAlbum(id);
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  addArtist(@Param('id') id: string) {
    if (!validate(id)) {
      throw new HttpException('artistId is invalid', HttpStatus.BAD_REQUEST);
    }
    return this.favoritesService.addArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Header('Content-Type', 'application/json')
  deleteArtist(@Param('id') id: string) {
    if (!validate(id)) {
      throw new HttpException('artistId is invalid', HttpStatus.BAD_REQUEST);
    }
    this.favoritesService.removeArtist(id);
  }

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  addTrack(@Param('id') id: string) {
    if (!validate(id)) {
      throw new HttpException('trackId is invalid', HttpStatus.BAD_REQUEST);
    }
    return this.favoritesService.addTrack(id);
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Header('Content-Type', 'application/json')
  deleteTrack(@Param('id') id: string) {
    if (!validate(id)) {
      throw new HttpException('artistId is invalid', HttpStatus.BAD_REQUEST);
    }
    this.favoritesService.removeTrack(id);
  }
}
