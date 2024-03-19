import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { ArtistEntity } from '../entities/artist.entity';

export interface ArtistStorage {
  getArtists: () => ArtistEntity[];
  getArtistById: (id: string) => ArtistEntity | undefined;
  createArtist: (params: CreateArtistDto) => ArtistEntity;
  updateArtistInfo: (
    id: string,
    params: UpdateArtistDto,
  ) => ArtistEntity | undefined;
  deleteArtist: (id: string) => boolean;
}
