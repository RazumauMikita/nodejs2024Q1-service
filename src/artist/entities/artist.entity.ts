import { AlbumEntity } from 'src/album/entities/album.entity';
import { FavoriteEntity } from 'src/favorites/entities/favorite.entity';
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
export class ArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  @OneToMany(() => AlbumEntity, (album) => album.artistId, {
    onDelete: 'SET NULL',
  })
  albums: AlbumEntity[];

  @OneToMany(() => TrackEntity, (track) => track.artistId, {
    onDelete: 'SET NULL',
  })
  tracks: AlbumEntity[];

  @Column({ default: false })
  isFavorite: boolean;
}
