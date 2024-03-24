import { Injectable } from '@nestjs/common';
import { Artist } from 'src/data-base/entities/artist.entity';
import { Track } from 'src/data-base/entities/track.entity';
import { User } from 'src/data-base/entities/user.entity';
import { Album } from './entities/album.entity';
import { Favorites } from './entities/favorites.entity';

@Injectable()
export class DataBaseService {
  public users: User[] = [];
  public tracks: Track[] = [];
  public artists: Artist[] = [];
  public albums: Album[] = [];
  public favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };
}
