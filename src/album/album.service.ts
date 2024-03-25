import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAlbumDto } from './dto/createAlbum.dto';
import { UpdateAlbumDto } from './dto/updateAlbum.dto';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}

  public async getArtistAll() {
    return await this.prisma.album.findMany();
  }

  public async getArtistById(id: string) {
    return await this.findArtistById(id);
  }

  public async createArtistById(dto: CreateAlbumDto) {
    const { artistId, ...rest } = dto;

    return await this.prisma.album.create({
      data: {
        ...rest,
        artistId: artistId || null,
      },
    });
  }

  public async updateArtistById(id: string, dto: UpdateAlbumDto) {
    await this.findArtistById(id);
    const { artistId, ...rest } = dto;

    return await this.prisma.album.update({
      where: { id },
      data: {
        ...rest,
        artistId: artistId || null,
      },
    });
  }

  public async deleteArtistById(id: string) {
    await this.findArtistById(id);
    await this.prisma.album.delete({
      where: { id },
    });
  }

  private async findArtistById(id: string) {
    const album = await this.prisma.album.findUnique({
      where: { id },
    });

    if (!album) {
      throw new NotFoundException('Album with this ID not found');
    }

    return album;
  }
}
