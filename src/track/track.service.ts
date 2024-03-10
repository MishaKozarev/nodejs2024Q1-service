import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dbo/createTrack.dbo';
import { UpdateTrackDto } from './dbo/updateTrack.dbo';
import { Track } from '../data-base/entities/track.entity';
import { v4 as uuidv4 } from 'uuid';
import { DataBaseService } from '../data-base/data-base.service';

@Injectable()
export class TrackService {
  constructor(private dataBaseService: DataBaseService) {}

  public getAllTrack(): Track[] {
    return this.dataBaseService.tracks;
  }

  public getTrackById(id: string): Track {
    return this.findTrackById(id);
  }

  public createTrackById(dto: CreateTrackDto): Track {
    const track: Track = {
      id: uuidv4(),
      ...dto,
    };
    this.dataBaseService.tracks.push(track);
    return track;
  }

  public updateTrackById(id: string, dto: UpdateTrackDto): Track {
    const track = this.findTrackById(id);
    return Object.assign(track, dto);
  }

  public deleteTrackById(id: string): void {
    const track = this.findTrackById(id);
    const trackIndex = this.dataBaseService.tracks.indexOf(track);
    this.dataBaseService.tracks.splice(trackIndex, 1);
  }

  private findTrackById(id: string): Track {
    const track = this.dataBaseService.tracks.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException('Track with this ID not found');
    }
    return track;
  }
}
