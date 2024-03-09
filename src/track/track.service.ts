import { Inject, Injectable } from '@nestjs/common';

import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackStorage } from './interfaces/track-storage.interface';

@Injectable()
export class TrackService {
  constructor(@Inject('TrackStore') private storage: TrackStorage) {}
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
    return this.storage.deleteTrack(id);
  }
}
