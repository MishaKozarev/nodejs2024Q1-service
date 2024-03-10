import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataBaseModule } from './data-base/data-base.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [DataBaseModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
