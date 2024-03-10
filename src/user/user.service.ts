import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UserService {
  public getAllUsers() {
    return 'get all users';
  }

  public getUserById(id: string) {
    return `get user by id = ${id}`;
  }

  public createUserById(dto: CreateUserDto) {
    return `create new user ${dto}`;
  }

  public updateUserById(id: string, dto: UpdateUserDto) {
    return `update user id = ${id}, dto = ${dto}`;
  }

  public deleteUserById(id: string) {
    return `delete user ${id}`;
  }
}
