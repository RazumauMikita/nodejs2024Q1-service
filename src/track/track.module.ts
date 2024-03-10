import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { InMemoryTracksStorage } from './store/tracks.storage';

@Module({
  controllers: [TrackController],
  providers: [
    TrackService,
    { provide: 'TrackStore', useClass: InMemoryTracksStorage },
  ],
  exports: [TrackService, 'TrackStore'],
})
export class TrackModule {}
