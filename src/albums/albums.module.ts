import { Module } from '@nestjs/common';

import { AlbumsDatabase } from 'database';

import { ArtistsModule } from '@/artists';
import { EntityName, SharedModule, TOKEN_DATABASE } from '@/shared';

import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';

@Module({
  imports: [ArtistsModule, SharedModule],
  controllers: [AlbumsController],
  providers: [
    AlbumsService,
    {
      provide: TOKEN_DATABASE[EntityName.ALBUM],
      useClass: AlbumsDatabase,
    },
  ],
  exports: [AlbumsService],
})
export class AlbumsModule {}
