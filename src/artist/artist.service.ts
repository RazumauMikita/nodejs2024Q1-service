import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  constructor(
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
  }

  async remove(id: string) {
    const existArtist = await this.artistRepository.findOne({
      where: { id },
    });
    if (!existArtist)
      throw new HttpException("Artist doesn't exist", HttpStatus.NOT_FOUND);
    await this.artistRepository.delete(id);
  }
}
