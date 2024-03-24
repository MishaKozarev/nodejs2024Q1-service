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
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dbo/createArtist.dbo';
import { UpdateArtistDto } from './dbo/updateArtist.dbo';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  getArtistAll() {
    return this.artistService.getArtistAll();
  }

  @Get(':id')
  @Header('Content-Type', 'application/json')
  getArtistById(@Param('id', ParseUUIDPipe) id: string) {
    return this.artistService.getArtistById(id);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  @Header('Content-Type', 'application/json')
  createArtistById(@Body() dto: CreateArtistDto) {
    return this.artistService.createArtistById(dto);
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  @Header('Content-Type', 'application/json')
  updateArtistById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateArtistDto,
  ) {
    return this.artistService.updateArtistById(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteArtistById(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.artistService.deleteArtistById(id);
  }
}
