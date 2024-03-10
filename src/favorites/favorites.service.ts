import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Album } from 'src/data-base/entities/album.entity';
import { Artist } from 'src/data-base/entities/artist.entity';
import { Entity, Favorites } from 'src/data-base/entities/favorites.entity';
import { Track } from 'src/data-base/entities/track.entity';
import { DataBaseService } from '../data-base/data-base.service';

@Injectable()
export class FavoritesService {
  constructor(private dataBaseService: DataBaseService) {}

  public getArtistAll(): Favorites {
    return this.dataBaseService.favorites;
  }

  public addFavorites(entityName: Entity, id: string): void {
    const entity = this.findEntity(entityName, id);

    const entityInFavorites = this.dataBaseService.favorites[entityName].find(
      (entity: Artist | Album | Track) => entity.id === id,
    );

    if (!entityInFavorites) {
      this.dataBaseService.favorites[entityName].push(entity);
    }
  }

  public deleteFavorites(entityName: Entity, id: string): void {
    const entity = this.dataBaseService.favorites[entityName].find(
      (entity: Artist | Album | Track) => entity.id === id,
    );

    if (!entity) {
      throw new NotFoundException(
        `${
          entityName[0].toUpperCase + entityName.slice(1)
        } with this ID not found`,
      );
    }

    const entityIndex =
      this.dataBaseService.favorites[entityName].indexOf(entity);

    this.dataBaseService.favorites[entityName].splice(entityIndex, 1);
  }

  private findEntity(entityName: Entity, id: string): Artist | Album | Track {
    const entity = this.dataBaseService[entityName].find(
      (entity: Artist | Album | Track) => entity.id === id,
    );

    if (!entity) {
      throw new UnprocessableEntityException(
        `${
          entityName[0].toUpperCase + entityName.slice(1)
        } with this ID doesn't exist`,
      );
    }

    return entity;
  }
}
