import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { Entity, Favorites } from 'src/data-base/entities/favorites.entity';
import { FavoritesService } from './favorites.service';

@Controller('favorites')
export class FavoritesController {
  private entities = ['track', 'album', 'artist'];

  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  getArtistAll(): Favorites {
    return this.favoritesService.getArtistAll();
  }

  @Post(':entity/:id')
  addFavorites(
    @Param('entity') entity: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): string {
    if (this.entities.includes(entity)) {
      this.favoritesService.addFavorites(this.convertEntity(entity), id);
      return `${
        entity[0].toUpperCase + entity.slice(1)
      } successfully added to favorites`;
    } else {
      throw new BadRequestException('Invalid entity');
    }
  }

  @Delete(':entity/:id')
  @HttpCode(204)
  deleteFavorites(
    @Param('entity') entity: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): string {
    if (this.entities.includes(entity)) {
      this.favoritesService.deleteFavorites(this.convertEntity(entity), id);
      return `${
        entity[0].toUpperCase + entity.slice(1)
      } successfully deleted from favorites`;
    } else {
      throw new BadRequestException('Invalid entity');
    }
  }

  private convertEntity(entityName: string): Entity {
    return `${entityName}s` as Entity;
  }
}
