import { HttpException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { TrackEntity } from 'src/track/entities/track.entity';
import { AlbumEntity } from 'src/album/entities/album.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(ArtistEntity)
    private artistsRepository: Repository<ArtistEntity>,
    @InjectRepository(TrackEntity)
    private tracksRepository: Repository<TrackEntity>,
    @InjectRepository(AlbumEntity)
    private albumsRepository: Repository<AlbumEntity>,
  ) {}

  async findAll() {
    const artists = await this.getFavArtists();
    const albums = await this.getFavAlbum();
    const tracks = await this.getFavTrack();
    return {
      artists,
      albums,
      tracks,
    };
  }

  async addAlbum(id: string) {
    const existAlbum = await this.albumsRepository.findOne({ where: { id } });
    if (!existAlbum) throw new HttpException("Album doesn't exist", 422);

    return await this.albumsRepository.update(id, {
      isFavorite: true,
    });
  }

  async addArtist(id: string) {
    const existArtist = await this.artistsRepository.findOne({ where: { id } });
    if (!existArtist) throw new HttpException("Artist doesn't exist", 422);
    return await this.artistsRepository.update(id, {
      isFavorite: true,
    });
  }

  async addTrack(id: string) {
    const existTrack = await this.tracksRepository.findOne({ where: { id } });
    if (!existTrack) throw new HttpException("Track doesn't exist", 422);
    return await this.tracksRepository.update(id, {
      isFavorite: true,
    });
  }

  async getFavArtists() {
    return await this.artistsRepository.find({
      where: {
        isFavorite: true,
      },
      select: {
        id: true,
        grammy: true,
        name: true,
      },
    });
  }

  async getFavAlbum() {
    return await this.albumsRepository.find({
      where: {
        isFavorite: true,
      },
      select: {
        id: true,
        name: true,
        year: true,
        artistId: true,
      },
    });
  }

  async getFavTrack() {
    return await this.tracksRepository.find({
      where: {
        isFavorite: true,
      },
      select: {
        albumId: true,
        artistId: true,
        duration: true,
        id: true,
        name: true,
      },
    });
  }

  async removeAlbum(id: string) {
    return await this.albumsRepository.update(id, {
      isFavorite: false,
    });
  }

  async removeArtist(id: string) {
    return await this.artistsRepository.update(id, {
      isFavorite: false,
    });
  }

  async removeTrack(id: string) {
    return await this.tracksRepository.update(id, {
      isFavorite: false,
    });
  }
}
