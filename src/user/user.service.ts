import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { User } from './entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  private users: User[] = [];

  private findUserById(id: string): User {
    const user = this.users.find((user) => user.id === id);
    return user;
  }

  public getAllUsers(): User[] {
    return this.users;
  }

  public getUserById(id: string): User {
    return this.findUserById(id);
  }

  public createUserById(dto: CreateUserDto): User {
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
    const userIndex = this.users.indexOf(user);
    this.users.splice(userIndex, 1);
  }
}
