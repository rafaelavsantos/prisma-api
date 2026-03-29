import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserEntity } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = await this.prisma.user.create({
      data: createUserDto,
    });

    return user;
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.prisma.user.findMany();
  }

  async findOne(id: number): Promise<UserEntity> {
    const userExists = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!userExists) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return userExists;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    return await this.prisma.user.update({
      where: {
        id,
      },
      data: updateUserDto,
    });
  }

  async remove(id: number): Promise<UserEntity> {
    return await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
