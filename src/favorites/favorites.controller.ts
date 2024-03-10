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
import { FavoritesService } from './favorites.service';
import { validate } from 'uuid';

enum ResponseMessage {
  ARTIST_WAS_ADDED = 'Artist was added to favorites',
  ALBUM_WAS_ADDED = 'Album was added to favorites',
  TRACK_WAS_ADDED = 'Track was added to favorites',
  ARTIST_WAS_DELETED = 'Artist was deleted from favorites',
  ALBUM_WAS_DELETED = 'Album was deleted from favorites',
  TRACK_WAS_DELETED = 'Track was deleted from favorites',
}

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  getFavorites() {
    return this.favoritesService.findAll();
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  addAlbum(@Param('id') id: string) {
    if (!validate(id)) {
      throw new HttpException('albumId is invalid', HttpStatus.BAD_REQUEST);
    }
    const result = this.favoritesService.addAlbum(id);
    if (!result) {
      throw new HttpException("Album doesn't exist", 422);
    } else {
      return this.favoritesService.findAll();
    }
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Header('Content-Type', 'application/json')
  deleteAlbum(@Param('id') id: string) {
    if (!validate(id)) {
      throw new HttpException('albumId is invalid', HttpStatus.BAD_REQUEST);
    }
    const result = this.favoritesService.removeAlbum(id);
    if (!result) {
      throw new HttpException('Album is not favorite', 422);
    } else {
      return ResponseMessage.ALBUM_WAS_ADDED;
    }
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  addArtist(@Param('id') id: string) {
    if (!validate(id)) {
      throw new HttpException('artistId is invalid', HttpStatus.BAD_REQUEST);
    }
    const result = this.favoritesService.addArtist(id);
    if (!result) {
      throw new HttpException("Artist doesn't exist", 422);
    } else {
      return this.favoritesService.findAll();
    }
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Header('Content-Type', 'application/json')
  deleteArtist(@Param('id') id: string) {
    if (!validate(id)) {
      throw new HttpException('artistId is invalid', HttpStatus.BAD_REQUEST);
    }
    const result = this.favoritesService.removeArtist(id);
    if (!result) {
      throw new HttpException('Artist is not favorite', 422);
    } else {
      return ResponseMessage.ALBUM_WAS_ADDED;
    }
  }

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  addTrack(@Param('id') id: string) {
    if (!validate(id)) {
      throw new HttpException('trackId is invalid', HttpStatus.BAD_REQUEST);
    }
    const result = this.favoritesService.addTrack(id);
    if (!result) {
      throw new HttpException("Track doesn't exist", 422);
    } else {
      return this.favoritesService.findAll();
    }
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Header('Content-Type', 'application/json')
  deleteTrack(@Param('id') id: string) {
    if (!validate(id)) {
      throw new HttpException('artistId is invalid', HttpStatus.BAD_REQUEST);
    }
    const result = this.favoritesService.removeTrack(id);
    if (!result) {
      throw new HttpException('Track is not favorite', 422);
    } else {
      return ResponseMessage.TRACK_WAS_DELETED;
    }
  }
}
