import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from './entities/track.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
  ) {}
  async create(createTrackDto: CreateTrackDto) {
    return await this.trackRepository.save({
      name: createTrackDto.name,
      duration: createTrackDto.duration,
    });
  }

  async findAll() {
    return await this.trackRepository.find();
  }

  async findOne(id: string) {
    const existTrack = await this.trackRepository.findOne({
      where: { id },
    });
    if (!existTrack)
      throw new HttpException("Track doesn't exist", HttpStatus.NOT_FOUND);
    return existTrack;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const existTrack = await this.trackRepository.findOne({
      where: { id },
    });
    if (!existTrack)
      throw new HttpException("Track doesn't exist", HttpStatus.NOT_FOUND);

    await this.trackRepository.update(id, updateTrackDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    const existTrack = await this.trackRepository.findOne({
      where: { id },
    });
    if (!existTrack)
      throw new HttpException("Track doesn't exist", HttpStatus.NOT_FOUND);
    await this.trackRepository.delete(id);
  }
}
