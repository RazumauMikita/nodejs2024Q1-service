import { Inject, Injectable } from '@nestjs/common';

import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumStorage } from './interfaces/album-storage.interface';
import { TrackStorage } from 'src/track/interfaces/track-storage.interface';
import { FavoriteStorage } from 'src/favorites/interfaces/favorites-storage';

@Injectable()
export class AlbumService {
  constructor(
    @Inject('AlbumStore') private storage: AlbumStorage,
    @Inject('TrackStore') private trackStorage: TrackStorage,
    @Inject('FavoriteStore') private favoriteStorage: FavoriteStorage,
  ) {}
  create(createAlbumDto: CreateAlbumDto) {
    return this.storage.createAlbum(createAlbumDto);
  }

  findAll() {
    return this.storage.getAlbums();
  }

  findOne(id: string) {
    return this.storage.getAlbumById(id);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    return this.storage.updateAlbum(id, updateAlbumDto);
  }

  remove(id: string) {
    const tracks = this.trackStorage.getTracks();
    this.favoriteStorage.deleteAlbum(id);
    tracks.forEach((track) => {
      if (track.albumId === id) {
        track.albumId = null;
      }
    });

    return this.storage.deleteAlbum(id);
  }
}
