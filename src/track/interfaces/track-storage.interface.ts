import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';
import { TrackEntity } from '../entities/track.entity';

export interface TrackStorage {
  getTracks: () => TrackEntity[];
  getTrackById: (id: string) => TrackEntity | undefined;
  createTrack: (params: CreateTrackDto) => TrackEntity;
  updateTrackInfo: (
    id: string,
    params: UpdateTrackDto,
  ) => TrackEntity | undefined;
  deleteTrack: (id: string) => boolean;
}
