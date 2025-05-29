import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { TracksDatabase } from 'src/database/tracks.database';

@Module({
  controllers: [TracksController],
  providers: [
    TracksService,
    {
      provide: 'TracksRepository',
      useClass: TracksDatabase,
    },
  ],
})
export class TracksModule {}
