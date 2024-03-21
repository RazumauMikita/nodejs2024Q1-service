import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { UpdateArtistDto } from '../dto/update-artist.dto';
import { ArtistEntity } from '../entities/artist.entity';
import { ArtistStorage } from '../interfaces/artist-storage.interface';
import { CreateArtistDto } from '../dto/create-artist.dto';

@Injectable()
export class InMemoryArtistsStorage implements ArtistStorage {
  private artists: ArtistEntity[] = [];

  getArtists(): ArtistEntity[] {
    return this.artists;
  }
  getArtistById(id: string): ArtistEntity | undefined {
    return this.artists.find((elem) => elem.id === id);
  }

  createArtist(params: CreateArtistDto): ArtistEntity {
    const newArtist: ArtistEntity = {
      id: uuid(),
      albums: [],
      ...params,
    };
    this.artists.push(newArtist);
    return newArtist;
  }
  updateArtistInfo(
    id: string,
    params: UpdateArtistDto,
  ): ArtistEntity | undefined {
    const artist = this.getArtistById(id);
    if (artist) {
      Object.assign(artist, params);
    }
    return artist;
  }
  deleteArtist(id: string): boolean {
    const user = this.artists.find((elem) => elem.id === id);
    const isArtistExist = user ? true : false;
    if (isArtistExist) {
      this.artists = this.artists.filter((elem) => elem.id !== id);
    }
    return isArtistExist;
  }
}
