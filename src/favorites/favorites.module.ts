import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { ArtistsModule } from 'src/artists/artists.module';
import { AlbumsModule } from 'src/albums/albums.module';
import { TracksModule } from 'src/tracks/tracks.module';
import { FavoritesDatabase } from 'src/database/favorites.database';
import { TOKEN_DATABASE } from 'src/shared/tokens/databases';

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
