import { FavoriteEntity } from '../entities/favorite.entity';
import { FavoriteStorage } from '../interfaces/favorites-storage';

export class InMemoryFavoritesStorage implements FavoriteStorage {
  private favorites: FavoriteEntity = {
    artists: [],
    albums: [],
    tracks: [],
  };
  getFavorites(): FavoriteEntity {
    return this.favorites;
  }
  addAlbum(id: string): void {
    this.favorites.albums.push(id);
  }
  deleteAlbum(id: string): boolean {
    if (this.favorites.albums.find((elem) => elem === id)) {
      this.favorites.albums = this.favorites.tracks.filter(
        (elem) => elem === id,
      );
      return true;
    }
    return false;
  }
  addTrack(id: string): void {
    this.favorites.tracks.push(id);
  }
  deleteTrack(id: string): boolean {
    if (this.favorites.tracks.find((elem) => elem === id)) {
      this.favorites.tracks = this.favorites.albums.filter(
        (elem) => elem === id,
      );
      return true;
    }
    return false;
  }
  addArtist(id: string): void {
    this.favorites.artists.push(id);
  }
  deleteArtist(id: string): boolean {
    if (this.favorites.artists.find((elem) => elem === id)) {
      this.favorites.artists = this.favorites.tracks.filter(
        (elem) => elem === id,
      );
      return true;
    }
    return false;
  }
}
