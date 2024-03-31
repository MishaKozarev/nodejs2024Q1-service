import { Injectable } from '@nestjs/common';
import { CreateDto } from './auth/dto/create.dto';
import { UpdateDto } from './auth/dto/update.dto';

@Injectable()
export class AppService {
  public findAll() {
    return 'find all';
  }

  public findOne(id: string) {
    return 'find one ' + id;
  }

  public create(dto: CreateDto) {
    console.log(dto);
    return 'user created';
  }

  public update(id: string, dto: UpdateDto) {
    console.log(dto);
    return 'user updated' + id;
  }

  public delete(id: string) {
    return 'user deleted' + id;
  }
}
