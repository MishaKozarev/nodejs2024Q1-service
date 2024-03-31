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
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  @Header('Content-Type', 'application/json')
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Get('id')
  @Header('Content-Type', 'application/json')
  async getUserById(@Param('id') id: string) {
    return await this.userService.getUserById(id);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  @Header('Content-Type', 'application/json')
  async createUserById(@Body() dto: CreateUserDto) {
    return await this.userService.createUserById(dto);
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  @Header('Content-Type', 'application/json')
  async updateUserById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateUserDto,
  ) {
    return await this.userService.updateUserById(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteUserById(@Param('id', ParseUUIDPipe) id: string) {
    await this.userService.deleteUserById(id);
  }
}
