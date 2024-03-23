import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { TrackEntity } from 'src/track/entities/track.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('integer')
  year: number;

  @Column({
    nullable: true,
  })
  artistId: string;

  @Column({ default: false })
  isFavorite: boolean;

  @ManyToOne(() => ArtistEntity, (artist) => artist.albums, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ referencedColumnName: 'id' })
  artist: string;

  @OneToMany(() => TrackEntity, (track) => track.albumId, {
    onDelete: 'SET NULL',
  })
  tracks: TrackEntity[];
}
