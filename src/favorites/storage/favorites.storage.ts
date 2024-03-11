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
    const isEntityFavorite = this.favorites.albums.includes(id);

    if (isEntityFavorite) {
      const newAlbums = [];
      this.favorites.albums.forEach((elem) => {
        if (elem !== id) {
          newAlbums.push(elem);
        }
      });
      this.favorites.albums = newAlbums;

      return true;
    }
    return false;
  }
  addTrack(id: string): void {
    this.favorites.tracks.push(id);
  }
  deleteTrack(id: string): boolean {
    const isEntityFavorite = this.favorites.tracks.includes(id);

    if (isEntityFavorite) {
      const newTracks = [];
      this.favorites.tracks.forEach((elem) => {
        if (elem !== id) {
          newTracks.push(elem);
        }
      });
      this.favorites.tracks = newTracks;

      return true;
    }
    return false;
  }
  addArtist(id: string): void {
    this.favorites.artists.push(id);
  }
  deleteArtist(id: string): boolean {
    const isEntityFavorite = this.favorites.artists.includes(id);

    if (isEntityFavorite) {
      const newArtists = [];
      this.favorites.artists.forEach((elem) => {
        if (elem !== id) {
          newArtists.push(elem);
        }
      });
      this.favorites.artists = newArtists;

      return true;
    }
    return false;
  }
}
