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
import { Entity } from 'src/entities/favorites.entity';
import { FavoritesService } from './favorites.service';

@Controller('favorites')
export class FavoritesController {
  private entities = ['track', 'album', 'artist'];

  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  getArtistAll() {
    return this.favoritesService.getArtistAll();
  }

  @Post(':entity/:id')
  async addFavorites(
    @Param('entity') entity: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    if (this.entities.includes(entity)) {
      return this.favoritesService.addFavorites(entity as Entity, id);
    } else {
      throw new BadRequestException('Invalid entity');
    }
  }

  @Delete(':entity/:id')
  @HttpCode(204)
  async deleteFavorites(
    @Param('entity') entity: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    if (this.entities.includes(entity)) {
      return await this.favoritesService.deleteFavorites(entity as Entity, id);
    } else {
      throw new BadRequestException('Invalid entity');
    }
  }
}
