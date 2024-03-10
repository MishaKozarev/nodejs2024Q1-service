import { Controller, Get, Header } from '@nestjs/common';

@Controller('track')
export class TrackController {
  @Get()
  @Header('Content-Type', 'application/json')
  getAll() {
    return 'Track service';
  }
}
