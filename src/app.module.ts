import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { FavoritesModule } from './favorites/favorites.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { CustomLoggerService } from './logger/logger.service';
import { ExceptionsFilter } from './filters/exception.filter';
import { LoggerMiddleware } from './logger/logger.middleware';

@Module({
  imports: [
    UserModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavoritesModule,
    PrismaModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  providers: [
    ExceptionsFilter,
    CustomLoggerService,
    {
      provide: APP_FILTER,
      useValue: new ExceptionsFilter(new CustomLoggerService()),
    },
  ],
})
export class AppModule {}
