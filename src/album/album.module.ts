import { Module } from '@nestjs/common';
import { DataBaseModule } from '../data-base/data-base.module';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';

@Module({
  imports: [DataBaseModule],
  providers: [AlbumService],
  controllers: [AlbumController],
})
export class AlbumModule {}
