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
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/createAlbum.dto';
import { UpdateAlbumDto } from './dto/updateAlbum.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  getArtistAll() {
    return this.albumService.getArtistAll();
  }

  @Get(':id')
  @Header('Content-Type', 'application/json')
  getArtistById(@Param('id', ParseUUIDPipe) id: string) {
    return this.albumService.getArtistById(id);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  @Header('Content-Type', 'application/json')
  createArtistById(@Body() dto: CreateAlbumDto) {
    return this.albumService.createArtistById(dto);
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  @Header('Content-Type', 'application/json')
  updateArtistById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateAlbumDto,
  ) {
    return this.albumService.updateArtistById(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteArtistById(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.albumService.deleteArtistById(id);
  }
}
