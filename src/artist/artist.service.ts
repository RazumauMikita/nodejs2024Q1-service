import { Inject, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistStorage } from './interfaces/artist-storage.interface';
import { TrackStorage } from 'src/track/interfaces/track-storage.interface';
import { AlbumStorage } from 'src/album/interfaces/album-storage.interface';
import { FavoriteStorage } from 'src/favorites/interfaces/favorites-storage';

@Injectable()
export class ArtistService {
  constructor(
    @Inject('ArtistStore') private storage: ArtistStorage,
    @Inject('TrackStore') private trackStorage: TrackStorage,
    @Inject('AlbumStore') private albumStorage: AlbumStorage,
    @Inject('FavoriteStore') private favoriteStorage: FavoriteStorage,
  ) {}

  create(createArtistDto: CreateArtistDto) {
    return this.storage.createArtist(createArtistDto);
  }

  findAll() {
    return this.storage.getArtists();
  }

  findOne(id: string) {
    return this.storage.getArtistById(id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    return this.storage.updateArtistInfo(id, updateArtistDto);
  }

  remove(id: string) {
    this.favoriteStorage.deleteArtist(id);
    const tracks = this.trackStorage.getTracks();
    const albums = this.albumStorage.getAlbums();
    tracks.forEach((track) => {
      if (track.artistId === id) {
        track.artistId = null;
      }
    });
    albums.forEach((album) => {
      if (album.artistId === id) {
        album.artistId = null;
      }
    });
    return this.storage.deleteArtist(id);
  }
}
