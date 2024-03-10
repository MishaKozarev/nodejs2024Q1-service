import { Module } from '@nestjs/common';
import { DataBaseModule } from '../data-base/data-base.module';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';

@Module({
  imports: [DataBaseModule],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
