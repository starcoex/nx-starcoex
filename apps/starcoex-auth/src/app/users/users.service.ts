import { Injectable } from '@nestjs/common';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma-clients/starcoex-auth';
import { User } from './entities/user.entity';
import { hash } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserInput: Prisma.UserCreateInput): Promise<User> {
    return this.prismaService.user.create({
      data: {
        ...createUserInput,
        password: await hash(createUserInput.password, 10),
      },
    });
  }

  async getUser(args: Prisma.UserWhereUniqueInput) {
    return this.prismaService.user.findUniqueOrThrow({ where: args });
  }

  async getUsers() {
    return this.prismaService.user.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
