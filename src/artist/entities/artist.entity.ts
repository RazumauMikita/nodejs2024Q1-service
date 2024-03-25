import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { AlbumEntity } from 'src/album/entities/album.entity';
import { TrackEntity } from 'src/track/entities/track.entity';

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
