import { FavoriteEntity } from '../entities/favorite.entity';

export interface FavoriteStorage {
  getFavorites: () => FavoriteEntity;
  addTrack: (id: string) => void;
  addArtist: (id: string) => void;
  addAlbum: (id: string) => void;
  deleteTrack: (id: string) => boolean;
  deleteArtist: (id: string) => boolean;
  deleteAlbum: (id: string) => boolean;
}
