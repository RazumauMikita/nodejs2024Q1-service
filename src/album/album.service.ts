import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumEntity } from './entities/album.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
  ) {}
  async create(createAlbumDto: CreateAlbumDto) {
    return await this.albumRepository.save({
      name: createAlbumDto.name,
      year: createAlbumDto.year,
      isFavorite: false,
      artistId: createAlbumDto.artistId,
    });
  }

  async findAll() {
    return await this.albumRepository.find();
  }

  async findOne(id: string) {
    const existAlbum = await this.albumRepository.findOne({
      where: { id },
    });
    if (!existAlbum)
      throw new HttpException("Album doesn't exist", HttpStatus.NOT_FOUND);
    return existAlbum;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const existAlbum = await this.albumRepository.findOne({
      where: { id },
    });
    if (!existAlbum)
      throw new HttpException("Album doesn't exist", HttpStatus.NOT_FOUND);

    await this.albumRepository.update(id, updateAlbumDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    const existAlbum = await this.albumRepository.findOne({
      where: { id },
    });
    if (!existAlbum)
      throw new HttpException("Album doesn't exist", HttpStatus.NOT_FOUND);
    await this.albumRepository.delete(id);
  }
}
