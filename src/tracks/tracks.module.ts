import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { TracksDatabase } from 'src/database/tracks.database';
import { TOKEN_DATABASE } from 'src/shared/tokens/databases';
import { EntityName } from 'src/shared/types/entity-name.enum';

@Module({
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
