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
import { CreateTrackDto } from './dbo/createTrack.dbo';
import { UpdateTrackDto } from './dbo/updateTrack.dbo';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  async getAllTrack() {
    return await this.trackService.getAllTrack();
  }

  @Get(':id')
  @Header('Content-Type', 'application/json')
  async getTrackById(@Param('id', ParseUUIDPipe) id: string) {
    return await this.trackService.getTrackById(id);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  @Header('Content-Type', 'application/json')
  async createTrackById(@Body() dto: CreateTrackDto) {
    return await this.trackService.createTrackById(dto);
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  @Header('Content-Type', 'application/json')
  async updateTrackById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateTrackDto,
  ) {
    return await this.trackService.updateTrackById(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteTrackById(@Param('id', ParseUUIDPipe) id: string) {
    return await this.trackService.deleteTrackById(id);
  }
}
