import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { AlbumsDatabase } from 'src/database/albums.database';
import { TOKEN_DATABASE } from 'src/shared/tokens/databases';
import { EntityName } from 'src/shared/types/entity-name.enum';

@Module({
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
