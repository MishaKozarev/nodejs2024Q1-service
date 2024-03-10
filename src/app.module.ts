import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataBaseModule } from './data-base/data-base.module';
import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';

@Module({
  imports: [DataBaseModule, UserModule, TrackModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
