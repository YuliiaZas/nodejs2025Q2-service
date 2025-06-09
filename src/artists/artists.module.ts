import { Module } from '@nestjs/common';

import { ArtistsDatabase } from '@/database';
import { EntityName, PrismaModule, TOKEN_DATABASE } from '@/shared';

import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';

@Module({
  imports: [PrismaModule],
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
