import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ArtistEntity } from 'src/artist/entities/artist.entity';

@Entity()
export class FavoriteEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text', { array: true })
  @OneToMany(() => ArtistEntity, (artist) => artist.id)
  artists: string[];

  albums: string;
  tracks: string[];
}
