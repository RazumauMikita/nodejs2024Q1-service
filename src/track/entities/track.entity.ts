import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column({
    nullable: true,
  })
  artistId: string | null;
  @Column({
    nullable: true,
  })
  albumId: string | null;

  @Column('integer')
  duration: number;

  @Column({ default: false })
  isFavorite: boolean;
}
