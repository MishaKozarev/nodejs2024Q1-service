import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { isUUID } from 'class-validator';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { User, UserResponse } from './entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  private users: User[] = [];

  private convertUser(user: User): UserResponse {
    const { password, ...rest } = user;
    return rest;
  }

  private findUserById(id: string): User {
    if (!id || !isUUID(id)) {
      throw new BadRequestException('ID is not an UUID type');
    }
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with ID=${id} not found`);
    }
    return user;
  }

  public getAllUsers(): UserResponse[] {
    return this.users.map((user) => this.convertUser(user));
  }

  public getUserById(id: string): UserResponse {
    const currentUser = this.findUserById(id);
    return this.convertUser(currentUser);
  }

  public createUserById(dto: CreateUserDto): UserResponse {
    const { login, password } = dto;

    const user: User = {
      id: uuidv4(),
      login: login,
      password: password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.users.push(user);
    return this.convertUser(user);
  }

  public updateUserById(id: string, dto: UpdateUserDto): UserResponse {
    const { oldPassword, newPassword } = dto;
    const currentUser = this.findUserById(id);
    const { password } = currentUser;
    if (oldPassword !== password) {
      throw new ForbiddenException('Old password is incorrect');
    }
    currentUser.password = newPassword;
    currentUser.version += 1;
    currentUser.updatedAt = Date.now();
    return this.convertUser(currentUser);
  }

  public deleteUserById(id: string): void {
    const currentUser = this.findUserById(id);
    const userIndex = this.users.indexOf(currentUser);
    this.users.splice(userIndex, 1);
  }
}
