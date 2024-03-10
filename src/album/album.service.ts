import { Injectable, NotFoundException } from '@nestjs/common';
import { DataBaseService } from '../data-base/data-base.service';
import { Album } from '../data-base/entities/album.entity';
import { v4 as uuidv4 } from 'uuid';
import { CreateAlbumDto } from './dto/createAlbum.dto';
import { UpdateAlbumDto } from './dto/updateAlbum.dto';

@Injectable()
export class AlbumService {
  constructor(private dataBaseService: DataBaseService) {}

  public getArtistAll(): Album[] {
    return this.dataBaseService.albums;
  }

  public getArtistById(id: string): Album {
    return this.findArtistById(id);
  }

  public createArtistById(dto: CreateAlbumDto): Album {
    const album: Album = {
      id: uuidv4(),
      ...dto,
    };

    this.dataBaseService.albums.push(album);

    return album;
  }

  public updateArtistById(id: string, dto: UpdateAlbumDto): Album {
    const track = this.findArtistById(id);

    return Object.assign(track, dto);
  }

  public deleteArtistById(id: string): void {
    const album = this.findArtistById(id);
    const albumIndex = this.dataBaseService.albums.indexOf(album);

    this.dataBaseService.albums.splice(albumIndex, 1);
  }

  private findArtistById(id: string): Album {
    const album = this.dataBaseService.albums.find((album) => album.id === id);
    this.dataBaseService.tracks
      .filter((track) => track.albumId === album.id)
      .forEach((track) => (track.albumId = null));

    if (!album) {
      throw new NotFoundException('Album with this ID not found');
    }

    return album;
  }
}
