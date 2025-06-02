import { Module } from '@nestjs/common';

import { ArtistsDatabase } from '@/database';
import { EntityName, TOKEN_DATABASE } from '@/shared';

import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';

@Module({
  controllers: [ArtistsController],
  providers: [
    ArtistsService,
    {
      provide: TOKEN_DATABASE[EntityName.ARTIST],
      useClass: ArtistsDatabase,
    },
  ],
  exports: [ArtistsService],
})
export class ArtistsModule {}
