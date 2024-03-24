import { Module } from '@nestjs/common';
import { DataBaseModule } from '../data-base/data-base.module';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';

@Module({
  imports: [DataBaseModule],
  providers: [FavoritesService],
  controllers: [FavoritesController],
})
export class FavoritesModule {}
