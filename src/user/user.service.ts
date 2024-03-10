import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { User } from '../data-base/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { DataBaseService } from '../data-base/data-base.service';

@Injectable()
export class UserService {
  constructor(private dataBaseService: DataBaseService) {}

  private findUserById(id: string): User {
    const user = this.dataBaseService.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with ID=${id} not found`);
    }
    return user;
  }

  public getAllUsers(): User[] {
    return this.dataBaseService.users;
  }

  public getUserById(id: string): User {
    return this.findUserById(id);
  }

  public createUserById(dto: CreateUserDto): User {
    const user: User = {
      id: uuidv4(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      ...dto,
    };
    this.dataBaseService.users.push(user);
    return user;
  }

  public updateUserById(id: string, dto: UpdateUserDto): User {
    const { oldPassword, newPassword } = dto;
    const user = this.findUserById(id);
    const { password } = user;
    if (oldPassword !== password) {
      throw new ForbiddenException('Old password is incorrect');
    }
    user.password = newPassword;
    user.version += 1;
    user.updatedAt = Date.now();
    return user;
  }

  public deleteUserById(id: string): void {
    const user = this.findUserById(id);
    const userIndex = this.dataBaseService.users.indexOf(user);
    this.dataBaseService.users.splice(userIndex, 1);
  }
}
