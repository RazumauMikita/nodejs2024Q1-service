import { ArtistEntity } from 'src/artist/entities/artist.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

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
