import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';

import { AlbumEntity } from '../entities/album.entity';
import { AlbumStorage } from '../interfaces/album-storage.interface';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';

@Injectable()
export class InMemoryAlbumStorage implements AlbumStorage {
  private albums: AlbumEntity[] = [];
  constructor() {}
  getAlbums(): AlbumEntity[] {
    return this.albums;
  }
  getAlbumById(id: string): AlbumEntity | undefined {
    return this.albums.find((elem) => elem.id === id);
  }

  createAlbum(params: CreateAlbumDto): AlbumEntity {
    const newArtist: AlbumEntity = {
      id: uuid(),
      ...params,
    };
    this.albums.push(newArtist);
    return newArtist;
  }
  updateAlbum(id: string, params: UpdateAlbumDto): AlbumEntity | undefined {
    const artist = this.getAlbumById(id);
    if (artist) {
      Object.assign(artist, params);
    }
    return artist;
  }
  deleteAlbum(id: string): boolean {
    const user = this.albums.find((elem) => elem.id === id);
    const isArtistExist = user ? true : false;
    if (isArtistExist) {
      this.albums = this.albums.filter((elem) => elem.id !== id);
    }
    return isArtistExist;
  }
}
