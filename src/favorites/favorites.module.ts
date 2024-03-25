import { Module, forwardRef } from '@nestjs/common';

import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { ArtistModule } from 'src/artist/artist.module';
import { TrackModule } from 'src/track/track.module';
import { AlbumModule } from 'src/album/album.module';
import { FavoriteEntity } from './entities/favorite.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { TrackEntity } from 'src/track/entities/track.entity';
import { AlbumEntity } from 'src/album/entities/album.entity';

@Module({
  imports: [
    forwardRef(() => ArtistModule),
    forwardRef(() => TrackModule),
    forwardRef(() => AlbumModule),
    TypeOrmModule.forFeature([FavoriteEntity]),
    TypeOrmModule.forFeature([ArtistEntity]),
    TypeOrmModule.forFeature([TrackEntity]),
    TypeOrmModule.forFeature([AlbumEntity]),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
  exports: [FavoritesService],
})
export class FavoritesModule {}
