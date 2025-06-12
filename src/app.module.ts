import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';

import {
  ClassSerializerInterceptor,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { LoggerMiddleware, LoggerModule } from '@/shared';

import { AlbumsModule } from './albums/albums.module';
import { AppService } from './app.service';
import { ArtistsModule } from './artists/artists.module';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth-guard/auth.guard';
import { AuthGuardModule } from './auth-guard/auth-guard.module';
import { FavoritesModule } from './favorites/favorites.module';
import { TracksModule } from './tracks/tracks.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    LoggerModule,
    EventEmitterModule.forRoot(),
    UsersModule,
    ArtistsModule,
    AlbumsModule,
    TracksModule,
    FavoritesModule,
    AuthModule,
    AuthGuardModule,
  ],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
