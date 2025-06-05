import { Module } from '@nestjs/common';

import { AlbumsModule } from '@/albums';
import { ArtistsModule } from '@/artists/';
import { FavoritesDatabase } from '@/database';
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
