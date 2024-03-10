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
import { plainToClass } from 'class-transformer';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  @Header('Content-Type', 'application/json')
  getAllUsers(): User[] {
    const users = this.userService.getAllUsers();
    return users.map((user) => plainToClass(User, user));
  }

  @Get('id')
  @Header('Content-Type', 'application/json')
  getUserByAd(@Param('id') id: string): User {
    const user = this.userService.getUserById(id);
    return plainToClass(User, user);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  @Header('Content-Type', 'application/json')
  createUserById(@Body() dto: CreateUserDto): User {
    const user = this.userService.createUserById(dto);
    return plainToClass(User, user);
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  @Header('Content-Type', 'application/json')
  updateUserById(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    const user = this.userService.updateUserById(id, dto);
    return plainToClass(User, user);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUserById(@Param('id', ParseUUIDPipe) id: string): void {
    this.userService.deleteUserById(id);
  }
}
