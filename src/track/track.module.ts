import { Module, forwardRef } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { InMemoryTracksStorage } from './store/tracks.storage';
import { FavoritesModule } from 'src/favorites/favorites.module';

@Module({
  imports: [forwardRef(() => FavoritesModule)],
  controllers: [TrackController],
  providers: [
    TrackService,
    { provide: 'TrackStore', useClass: InMemoryTracksStorage },
  ],
  exports: [TrackService, 'TrackStore'],
})
export class TrackModule {}
