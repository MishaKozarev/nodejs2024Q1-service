import { Injectable } from '@nestjs/common';
import { Artist } from 'src/data-base/entities/artist.entity';
import { Track } from 'src/data-base/entities/track.entity';
import { User } from 'src/data-base/entities/user.entity';

@Injectable()
export class DataBaseService {
  public users: User[] = [];
  public tracks: Track[] = [];
  public artists: Artist[] = [];
}
