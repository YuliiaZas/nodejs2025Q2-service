import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { AlbumsDatabase } from 'src/database/albums.database';

@Module({
  controllers: [AlbumsController],
  providers: [
    AlbumsService,
    {
      provide: 'AlbumsDatabase',
      useClass: AlbumsDatabase,
    },
  ],
  exports: [AlbumsService],
})
export class AlbumsModule {}
