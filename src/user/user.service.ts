import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  public async getAllUsers() {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        login: true,
        version: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return users.map((user) => this.convertUser(user));
  }

  public async getUserById(id: string) {
    const user = await this.findUser(id);
    return this.convertUser(user);
  }

  public async findOneByLogin(login: string) {
    const user = await this.prisma.user.findFirst({
      where: { login },
      select: {
        id: true,
        login: true,
        version: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.convertUser(user);
  }

  public async createUserById({ login, password }: CreateUserDto) {
    const hash = await bcrypt.hash(password, Number(process.env.CRYPT_SALT));
    const user = await this.prisma.user.create({
      data: {
        login,
        password: hash,
        version: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      select: {
        id: true,
        login: true,
        version: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return {
      ...user,
      createdAt: user.createdAt.getTime(),
      updatedAt: user.updatedAt.getTime(),
    };
  }

  public async updateUserById(id: string, dto: UpdateUserDto) {
    const { oldPassword, newPassword } = dto;
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        login: true,
        password: true,
        version: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User with this ID not found');
    }
    const { password } = user;

    const cryptoPassword = bcrypt.compare(oldPassword, password);

    if (!cryptoPassword) {
      throw new ForbiddenException('Old password is incorrect');
    }

    const hash = await bcrypt.hash(newPassword, Number(process.env.CRYPT_SALT));

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        password: hash,
        version: user.version + 1,
        updatedAt: new Date(),
      },
      select: {
        id: true,
        login: true,
        version: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return this.convertUser(updatedUser);
  }

  public async deleteUserById(id: string) {
    await this.findUser(id);
    await this.prisma.user.delete({
      where: { id },
    });
  }

  private async findUser(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        login: true,
        version: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User with this ID not found');
    }

    return user;
  }

  private convertUser(user) {
    return {
      ...user,
      createdAt: user.createdAt.getTime(),
      updatedAt: user.updatedAt.getTime(),
    };
  }
}
