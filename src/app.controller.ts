import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { CreateDto } from './auth/dto/create.dto';
import { UpdateDto } from './auth/dto/update.dto';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(id);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  create(@Body() dto: CreateDto) {
    return this.authService.create(dto);
  }

  @UsePipes(new ValidationPipe())
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateDto) {
    return this.authService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.delete(id);
  }
}
