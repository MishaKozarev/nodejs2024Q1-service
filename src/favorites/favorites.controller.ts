import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  Header,
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
  @Header('Content-Type', 'application/json')
  findAll(): Favorites {
    return this.favoritesService.findAll();
  }

  @Post(':entity/:id')
  @Header('Content-Type', 'application/json')
  add(
    @Param('entity') entity: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): string {
    if (this.entities.includes(entity)) {
      this.favoritesService.add(this.convertToPlural(entity), id);
      return `${
        entity[0].toUpperCase + entity.slice(1)
      } successfully added to favorites`;
    } else {
      throw new BadRequestException('Invalid entity');
    }
  }

  @Delete(':entity/:id')
  @HttpCode(204)
  delete(
    @Param('entity') entity: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): string {
    if (this.entities.includes(entity)) {
      this.favoritesService.delete(this.convertToPlural(entity), id);
      return `${
        entity[0].toUpperCase + entity.slice(1)
      } successfully deleted from favorites`;
    } else {
      throw new BadRequestException('Invalid entity');
    }
  }

  private convertToPlural(entityName: string): Entity {
    return `${entityName}s` as Entity;
  }
}
