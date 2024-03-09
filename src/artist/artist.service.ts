import { Inject, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistStorage } from './interfaces/artist-storage.interface';

@Injectable()
export class ArtistService {
  constructor(@Inject('ArtistStore') private storage: ArtistStorage) {}

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
    return this.storage.deleteArtist(id);
  }
}
