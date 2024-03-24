import { Module } from '@nestjs/common';
import { DataBaseModule } from '../data-base/data-base.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [DataBaseModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
