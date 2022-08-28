import { HttpException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash, compare } from 'bcrypt';
import { createUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  private prisma: PrismaService;
  private jwtService: JwtService;

  constructor(prisma: PrismaService, jwtService: JwtService) {
    this.prisma = prisma;
    this.jwtService = jwtService;
  }

  async register(data: createUserDto): Promise<User> {
    const { password } = data;
    const plainToHash = await hash(password, 10);
    data = { ...data, password: plainToHash };
    return this.prisma.user.create({
      data,
    });
  }

  async login(loginDto: LoginAuthDto) {
    const { email, password } = loginDto;
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) throw new HttpException('User not found', 404);
    const { password: encryptPassword, ...findUser } = user;

    const checkPassword = await compare(password, encryptPassword);
    if (!checkPassword) throw new HttpException('Password is incorrect', 403);

    const payload = { id: findUser.id, name: findUser.name };
    const token = this.jwtService.sign(payload);
    const data = {
      user: findUser,
      token,
    };
    return data;
  }

  findAll(): Promise<Array<User>> {
    return this.prisma.user.findMany();
  }

  findOne(id: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    const { password } = data;
    const plainToHash = await hash(password, 10);
    data = { ...data, password: plainToHash };
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  remove(id: string): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
