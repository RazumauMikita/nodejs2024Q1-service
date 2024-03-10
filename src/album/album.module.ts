import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { InMemoryAlbumStorage } from './store/albums.storage';

@Module({
  controllers: [AlbumController],
  providers: [
    AlbumService,
    {
      provide: 'AlbumStore',
      useClass: InMemoryAlbumStorage,
    },
  ],
  exports: [AlbumService, 'AlbumStore'],
})
export class AlbumModule {}
