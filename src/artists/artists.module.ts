import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { ArtistsDatabase } from 'src/database/artists.database';

@Module({
  controllers: [ArtistsController],
  providers: [
    ArtistsService,
    {
      provide: 'ArtistsDatabase',
      useClass: ArtistsDatabase,
    },
  ],
  exports: [ArtistsService],
})
export class ArtistsModule {}
