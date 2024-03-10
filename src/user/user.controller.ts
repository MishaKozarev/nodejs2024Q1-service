import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserResponse } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  @Header('Content-Type', 'application/json')
  getAllUsers(): UserResponse[] {
    return this.userService.getAllUsers();
  }

  @Get('id')
  @Header('Content-Type', 'application/json')
  getUserByAd(@Param('id') id: string): UserResponse {
    return this.userService.getUserById(id);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  @Header('Content-Type', 'application/json')
  createUserById(@Body() dto: CreateUserDto): UserResponse {
    return this.userService.createUserById(dto);
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  @Header('Content-Type', 'application/json')
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.userService.updateUserById(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string) {
    return this.userService.deleteUserById(id);
  }
}
