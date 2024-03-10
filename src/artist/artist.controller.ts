import {
  Body,
  Controller,
  Get,
  Header,
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
import { Artist } from './entities/artist.entity';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  getArtistAll(): Artist[] {
    return this.artistService.getArtistAll();
  }

  @Get(':id')
  @Header('Content-Type', 'application/json')
  getArtistById(@Param('id', ParseUUIDPipe) id: string): Artist {
    return this.artistService.getArtistById(id);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  @Header('Content-Type', 'application/json')
  createArtistById(@Body() dto: CreateArtistDto): Artist {
    return this.artistService.createArtistById(dto);
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  @Header('Content-Type', 'application/json')
  updateArtistById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateArtistDto,
  ): Artist {
    return this.artistService.updateArtistById(id, dto);
  }
}
