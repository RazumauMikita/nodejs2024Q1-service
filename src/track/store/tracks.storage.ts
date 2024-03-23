import { v4 as uuid } from 'uuid';

import { CreateTrackDto } from '../dto/create-track.dto';
import { TrackEntity } from '../entities/track.entity';
import { TrackStorage } from '../interfaces/track-storage.interface';
import { UpdateTrackDto } from '../dto/update-track.dto';

export class InMemoryTracksStorage implements TrackStorage {
  private tracks: TrackEntity[] = [];

  getTracks(): TrackEntity[] {
    return this.tracks;
  }
  getTrackById(id: string): TrackEntity | undefined {
    return this.tracks.find((elem) => elem.id === id);
  }
  createTrack(params: CreateTrackDto): TrackEntity {
    const newTrack: TrackEntity = {
      id: uuid(),
      ...params,
      isFavorite: false,
      artist: null,
      album: null,
    };

    this.tracks.push(newTrack);
    return newTrack;
  }
  updateTrackInfo(id: string, params: UpdateTrackDto): TrackEntity | undefined {
    const track = this.getTrackById(id);
    if (track) {
      Object.assign(track, params);
    }
    return track;
  }
  deleteTrack(id: string): boolean {
    const user = this.tracks.find((elem) => elem.id === id);
    const isTrackExist = user ? true : false;
    if (isTrackExist) {
      this.tracks = this.tracks.filter((elem) => elem.id !== id);
    }
    return isTrackExist;
  }
}
