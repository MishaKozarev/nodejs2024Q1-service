import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dbo/createTrack.dbo';
import { UpdateTrackDto } from './dbo/updateTrack.dbo';
import { Track } from './entities/track.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TrackService {
  private tracks: Track[] = [];

  public getAllTrack(): Track[] {
    return this.tracks;
  }

  public getTrackById(id: string): Track {
    return this.findTrackById(id);
  }

  public createTrackById(dto: CreateTrackDto): Track {
    const track: Track = {
      id: uuidv4(),
      ...dto,
    };
    this.tracks.push(track);
    return track;
  }

  public updateTrackById(id: string, dto: UpdateTrackDto): Track {
    const track = this.findTrackById(id);
    return Object.assign(track, dto);
  }

  public deleteTrackById(id: string): void {
    const track = this.findTrackById(id);
    const trackIndex = this.tracks.indexOf(track);
    this.tracks.splice(trackIndex, 1);
  }

  private findTrackById(id: string): Track {
    const track = this.tracks.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException('Track with this ID not found');
    }
    return track;
  }
}
