import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateArtistDto } from './dbo/createArtist.dbo';
import { UpdateArtistDto } from './dbo/updateArtist.dbo';
import { Artist } from '../data-base/entities/artist.entity';
import { DataBaseService } from '../data-base/data-base.service';

@Injectable()
export class ArtistService {
  constructor(private dataBaseService: DataBaseService) {}

  public getArtistAll(): Artist[] {
    return this.dataBaseService.artists;
  }

  public getArtistById(id: string): Artist {
    return this.findArtistById(id);
  }

  public createArtistById(dto: CreateArtistDto): Artist {
    const artist: Artist = {
      id: uuidv4(),
      ...dto,
    };
    this.dataBaseService.artists.push(artist);
    return artist;
  }

  public updateArtistById(id: string, dto: UpdateArtistDto): Artist {
    const artist = this.findArtistById(id);
    return Object.assign(artist, dto);
  }

  public deleteArtistById(id: string): void {
    const artist = this.findArtistById(id);
    const artistIndex = this.dataBaseService.artists.indexOf(artist);
    this.dataBaseService.artists.splice(artistIndex, 1);
    this.dataBaseService.tracks
      .filter((track) => track.artistId === artist.id)
      .forEach((track) => (track.artistId = null));
    this.dataBaseService.albums
      .filter((album) => album.artistId === artist.id)
      .forEach((album) => (album.artistId = null));
  }

  private findArtistById(id: string): Artist {
    const artist = this.dataBaseService.artists.find(
      (artist) => artist.id === id,
    );
    if (!artist) {
      throw new NotFoundException(`Artist with ID = ${id} not found`);
    }
    return artist;
  }
}
