import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { ArtistsModule } from 'src/artists/artists.module';
import { AlbumsModule } from 'src/albums/albums.module';
import { TracksModule } from 'src/tracks/tracks.module';
import { FavoritesDatabase } from 'src/database/favorites.database';

@Module({
  imports: [AlbumsModule, ArtistsModule, TracksModule],
  controllers: [FavoritesController],
  providers: [
    FavoritesService,
    {
      provide: 'FavoritesRepository',
      useClass: FavoritesDatabase,
    },
  ],
})
export class FavoritesModule {}
