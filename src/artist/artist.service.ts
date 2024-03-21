import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistStorage } from './interfaces/artist-storage.interface';
import { TrackStorage } from 'src/track/interfaces/track-storage.interface';
import { AlbumStorage } from 'src/album/interfaces/album-storage.interface';
import { FavoriteStorage } from 'src/favorites/interfaces/favorites-storage';
import { UserEntity } from 'src/users/entities/user.entity';
import { ArtistEntity } from './entities/artist.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ArtistService {
  constructor(
    @Inject('ArtistStore') private storage: ArtistStorage,
    @Inject('TrackStore') private trackStorage: TrackStorage,
    @Inject('AlbumStore') private albumStorage: AlbumStorage,
    @Inject('FavoriteStore') private favoriteStorage: FavoriteStorage,
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
  ) {}

  async create(createArtistDto: CreateArtistDto) {
    return await this.artistRepository.save({
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    });
  }

  async findAll() {
    return await this.artistRepository.find();
  }

  async findOne(id: string) {
    const existArtist = await this.artistRepository.findOne({
      where: { id },
    });

    if (!existArtist)
      throw new HttpException("Artist doesn't exist", HttpStatus.NOT_FOUND);

    return existArtist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const existArtist = await this.artistRepository.findOne({
      where: { id },
    });
    if (!existArtist)
      throw new HttpException("Artist doesn't exist", HttpStatus.NOT_FOUND);

    await this.artistRepository.update(id, updateArtistDto);
    return this.findOne(id);
    //return this.storage.updateArtistInfo(id, updateArtistDto);
  }

  async remove(id: string) {
    const existArtist = await this.artistRepository.findOne({
      where: { id },
    });
    if (!existArtist)
      throw new HttpException("Artist doesn't exist", HttpStatus.NOT_FOUND);
    await this.artistRepository.delete(id);

    /* this.favoriteStorage.deleteArtist(id);
    const tracks = this.trackStorage.getTracks();
    const albums = this.albumStorage.getAlbums();
    tracks.forEach((track) => {
      if (track.artistId === id) {
        track.artistId = null;
      }
    });
    albums.forEach((album) => {
      if (album.artistId === id) {
        album.artistId = null;
      }
    });
    return this.storage.deleteArtist(id);*/
  }
}
