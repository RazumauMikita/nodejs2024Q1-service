import { Inject, Injectable } from '@nestjs/common';
import { ArtistStorage } from 'src/artist/interfaces/artist-storage.interface';
import { FavoriteStorage } from './interfaces/favorites-storage';
import { AlbumStorage } from 'src/album/interfaces/album-storage.interface';
import { TrackStorage } from 'src/track/interfaces/track-storage.interface';
import { FavoritesResponse } from './interfaces/favorites-response.interface';

@Injectable()
export class FavoritesService {
  constructor(
    @Inject('FavoriteStore') private favoriteStorage: FavoriteStorage,
    @Inject('AlbumStore') private albumStorage: AlbumStorage,
    @Inject('ArtistStore') private artistStorage: ArtistStorage,
    @Inject('TrackStore') private trackStorage: TrackStorage,
  ) {}

  findAll() {
    const response: FavoritesResponse = {
      albums: [],
      artists: [],
      tracks: [],
    };
    const favorites = this.favoriteStorage.getFavorites();

    favorites.albums.forEach((elem) => {
      response.albums.push(this.albumStorage.getAlbumById(elem));
    });

    favorites.artists.forEach((elem) => {
      response.artists.push(this.artistStorage.getArtistById(elem));
    });

    favorites.tracks.forEach((elem) => {
      response.tracks.push(this.trackStorage.getTrackById(elem));
    });

    return response;
  }

  addAlbum(id: string): boolean {
    const album = this.albumStorage.getAlbumById(id);
    if (album) {
      this.favoriteStorage.addAlbum(id);
    }
    return Boolean(album);
  }

  addArtist(id: string): boolean {
    const artist = this.artistStorage.getArtistById(id);
    if (artist) {
      this.favoriteStorage.addArtist(id);
    }
    return Boolean(artist);
  }

  addTrack(id: string): boolean {
    const track = this.trackStorage.getTrackById(id);
    if (track) {
      this.favoriteStorage.addTrack(id);
    }
    return Boolean(track);
  }

  removeAlbum(id: string) {
    const album = this.albumStorage.getAlbumById(id);
    if (album) {
      return this.favoriteStorage.deleteAlbum(id);
    }
    return false;
  }

  removeArtist(id: string) {
    const artist = this.artistStorage.getArtistById(id);
    if (artist) {
      return this.favoriteStorage.deleteArtist(id);
    }
    return false;
  }

  removeTrack(id: string) {
    const track = this.trackStorage.getTrackById(id);
    if (track) {
      return this.favoriteStorage.deleteTrack(id);
    }
    return false;
  }
}
