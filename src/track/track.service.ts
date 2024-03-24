import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dbo/createTrack.dbo';
import { UpdateTrackDto } from './dbo/updateTrack.dbo';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}

  public async getAllTrack() {
    return this.prisma.track.findMany();
  }

  public async getTrackById(id: string) {
    return await this.findTrackById(id);
  }

  public async createTrackById(dto: CreateTrackDto) {
    const { artistId, albumId, ...rest } = dto;

    return await this.prisma.track.create({
      data: {
        ...rest,
        artistId: artistId || null,
        albumId: albumId || null,
      },
    });
  }

  public async updateTrackById(id: string, dto: UpdateTrackDto) {
    await this.findTrackById(id);
    const { artistId, albumId, ...rest } = dto;

    return await this.prisma.track.update({
      where: { id },
      data: {
        ...rest,
        artistId: artistId || null,
        albumId: albumId || null,
      },
    });
  }

  public async deleteTrackById(id: string) {
    await this.findTrackById(id);
    await this.prisma.track.delete({
      where: { id },
    });
  }

  private async findTrackById(id: string) {
    const track = await this.prisma.track.findUnique({
      where: { id },
    });

    if (!track) {
      throw new NotFoundException('Track with this ID not found');
    }

    return track;
  }
}
