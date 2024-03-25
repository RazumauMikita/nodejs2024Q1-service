import { AlbumEntity } from 'src/album/entities/album.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column({
    nullable: true,
  })
  artistId: string;
  @Column({
    nullable: true,
  })
  albumId: string;

  @Column('integer')
  duration: number;

  @Column({ default: false })
  isFavorite: boolean;

  @ManyToOne(() => ArtistEntity, (artist) => artist.tracks, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ referencedColumnName: 'id' })
  artist: string;

  @ManyToOne(() => AlbumEntity, (album) => album.tracks, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ referencedColumnName: 'id' })
  album: string;
}
