import { Module } from '@nestjs/common';

import { AlbumsModule } from '@/albums';
import { ArtistsModule } from '@/artists';
import { TracksDatabase } from '@/database';
import { EntityName, TOKEN_DATABASE } from '@/shared';

import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';

@Module({
  imports: [ArtistsModule, AlbumsModule],
  controllers: [TracksController],
  providers: [
    TracksService,
    {
      provide: TOKEN_DATABASE[EntityName.TRACK],
      useClass: TracksDatabase,
    },
  ],
  exports: [TracksService],
})
export class TracksModule {}
