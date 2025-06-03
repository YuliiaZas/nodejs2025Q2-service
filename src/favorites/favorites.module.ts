import { Module } from '@nestjs/common';

import { FavoritesDatabase } from 'database';

import { AlbumsModule } from '@/albums';
import { ArtistsModule } from '@/artists/';
import { TOKEN_DATABASE } from '@/shared';
import { TracksModule } from '@/tracks';

import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';

@Module({
  imports: [AlbumsModule, ArtistsModule, TracksModule],
  controllers: [FavoritesController],
  providers: [
    FavoritesService,
    {
      provide: TOKEN_DATABASE.favorites,
      useClass: FavoritesDatabase,
    },
  ],
})
export class FavoritesModule {}
