import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { TracksDatabase } from 'src/database/tracks.database';

@Module({
  controllers: [TracksController],
  providers: [
    TracksService,
    {
      provide: 'TracksDatabase',
      useClass: TracksDatabase,
    },
  ],
  exports: [TracksService],
})
export class TracksModule {}
