import { Inject, Injectable } from '@nestjs/common';

import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackStorage } from './interfaces/track-storage.interface';
import { FavoriteStorage } from 'src/favorites/interfaces/favorites-storage';

@Injectable()
export class TrackService {
  constructor(
    @Inject('TrackStore') private storage: TrackStorage,
    @Inject('FavoriteStore') private favoriteStorage: FavoriteStorage,
  ) {}
  create(createTrackDto: CreateTrackDto) {
    return this.storage.createTrack(createTrackDto);
  }

  findAll() {
    return this.storage.getTracks();
  }

  findOne(id: string) {
    return this.storage.getTrackById(id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    return this.storage.updateTrackInfo(id, updateTrackDto);
  }

  remove(id: string) {
    this.favoriteStorage.deleteTrack(id);
    return this.storage.deleteTrack(id);
  }
}
