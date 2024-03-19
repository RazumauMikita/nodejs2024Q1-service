import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { AlbumEntity } from '../entities/album.entity';

export interface AlbumStorage {
  getAlbums: () => AlbumEntity[];
  getAlbumById: (id: string) => AlbumEntity | undefined;
  createAlbum: (params: CreateAlbumDto) => AlbumEntity;
  updateAlbum: (id: string, params: UpdateAlbumDto) => AlbumEntity | undefined;
  deleteAlbum: (id: string) => boolean;
}
