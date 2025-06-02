import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { ArtistsDatabase } from 'src/database/artists.database';
import { TOKEN_DATABASE } from 'src/shared/tokens/databases';
import { EntityName } from 'src/shared/types/entity-name.enum';

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
