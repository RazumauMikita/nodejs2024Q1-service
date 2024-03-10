import { Inject, Injectable } from '@nestjs/common';

import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumStorage } from './interfaces/album-storage.interface';

@Injectable()
export class AlbumService {
  constructor(@Inject('AlbumStore') private storage: AlbumStorage) {}
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
    return this.storage.deleteAlbum(id);
  }
}
