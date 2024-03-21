import { Module, forwardRef } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { InMemoryArtistsStorage } from './store/artists.storage';
import { AlbumModule } from 'src/album/album.module';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { TrackModule } from 'src/track/track.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistEntity } from './entities/artist.entity';

@Module({
  imports: [
    forwardRef(() => FavoritesModule),
    forwardRef(() => TrackModule),
    forwardRef(() => AlbumModule),
    TypeOrmModule.forFeature([ArtistEntity]),
  ],
  controllers: [ArtistController],
  providers: [
    ArtistService,
    {
      provide: 'ArtistStore',
      useClass: InMemoryArtistsStorage,
    },
  ],
  exports: [ArtistService, 'ArtistStore'],
})
export class ArtistModule {}
