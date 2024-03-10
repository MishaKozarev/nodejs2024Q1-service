import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  public getAllUsers() {
    return 'get all users';
  }

  public getUserById(id: string) {
    return `get user by id = ${id}`;
  }
}
