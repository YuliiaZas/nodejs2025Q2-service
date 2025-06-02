import { APP_INTERCEPTOR } from '@nestjs/core';

import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { AlbumsModule } from './albums/albums.module';
import { AppService } from './app.service';
import { ArtistsModule } from './artists/artists.module';
import { FavoritesModule } from './favorites/favorites.module';
import { TracksModule } from './tracks/tracks.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    UsersModule,
    ArtistsModule,
    AlbumsModule,
    TracksModule,
    FavoritesModule,
  ],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
