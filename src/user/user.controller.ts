import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('')
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get('id')
  getUserByAd(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }
}
