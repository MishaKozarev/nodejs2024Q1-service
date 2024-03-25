import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dbo/createArtist.dbo';
import { UpdateArtistDto } from './dbo/updateArtist.dbo';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}

  public async getArtistAll() {
    return await this.prisma.artist.findMany();
  }

  public async getArtistById(id: string) {
    return await this.findArtistById(id);
  }

  public async createArtistById(dto: CreateArtistDto) {
    return await this.prisma.artist.create({
      data: dto,
    });
  }

  public async updateArtistById(id: string, dto: UpdateArtistDto) {
    await this.findArtistById(id);
    return await this.prisma.artist.update({
      where: { id },
      data: dto,
    });
  }

  public async deleteArtistById(id: string) {
    await this.findArtistById(id);

    await this.prisma.artist.delete({
      where: { id },
    });
  }

  private async findArtistById(id: string) {
    const artist = await this.prisma.artist.findUnique({
      where: { id },
    });

    if (!artist) {
      throw new NotFoundException('Artist with this ID not found');
    }

    return artist;
  }
}
