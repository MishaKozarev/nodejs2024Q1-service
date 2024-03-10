import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Album } from '../data-base/entities/album.entity';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/createAlbum.dto';
import { UpdateAlbumDto } from './dto/updateAlbum.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  getArtistAll(): Album[] {
    return this.albumService.getArtistAll();
  }

  @Get(':id')
  @Header('Content-Type', 'application/json')
  findOne(@Param('id', ParseUUIDPipe) id: string): Album {
    return this.albumService.getArtistById(id);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  @Header('Content-Type', 'application/json')
  create(@Body() dto: CreateAlbumDto): Album {
    return this.albumService.createArtistById(dto);
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  @Header('Content-Type', 'application/json')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateAlbumDto,
  ): Album {
    return this.albumService.updateArtistById(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteArtistById(@Param('id', ParseUUIDPipe) id: string): void {
    this.albumService.deleteArtistById(id);
  }
}
