import { Module, forwardRef } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { InMemoryArtistsStorage } from './store/artists.storage';
import { AlbumModule } from 'src/album/album.module';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { TrackModule } from 'src/track/track.module';

@Module({
  imports: [
    forwardRef(() => FavoritesModule),
    TrackModule,
    forwardRef(() => AlbumModule),
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
