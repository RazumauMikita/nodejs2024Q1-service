import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { InMemoryTracksStorage } from './store/tracks.storage';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { TrackEntity } from './entities/track.entity';

@Module({
  imports: [
    forwardRef(() => FavoritesModule),
    TypeOrmModule.forFeature([TrackEntity]),
  ],
  controllers: [TrackController],
  providers: [
    TrackService,
    { provide: 'TrackStore', useClass: InMemoryTracksStorage },
  ],
  exports: [TrackService, 'TrackStore'],
})
export class TrackModule {}
