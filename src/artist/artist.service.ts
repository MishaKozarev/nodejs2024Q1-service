import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateArtistDto } from './dbo/createArtist.dbo';
import { UpdateArtistDto } from './dbo/updateArtist.dbo';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  private artists: Artist[] = [];

  public getArtistAll(): Artist[] {
    return this.artists;
  }

  public getArtistById(id: string): Artist {
    return this.findArtistById(id);
  }

  public createArtistById(dto: CreateArtistDto): Artist {
    const artist: Artist = {
      id: uuidv4(),
      ...dto,
    };
    this.artists.push(artist);
    return artist;
  }

  public updateArtistById(id: string, dto: UpdateArtistDto): Artist {
    const artist = this.findArtistById(id);
    return Object.assign(artist, dto);
  }

  public deleteArtistById(id: string): void {
    const artist = this.findArtistById(id);
    const artistIndex = this.artists.indexOf(artist);
    this.artists.splice(artistIndex, 1);
  }

  private findArtistById(id: string): Artist {
    const artist = this.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new NotFoundException(`Artist with ID = ${id} not found`);
    }
    return artist;
  }
}
