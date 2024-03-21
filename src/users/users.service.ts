import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserStorage } from './interfaces/user-storage.interface';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('UserStore') private storage: UserStorage,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { id } = await this.userRepository.save({
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    return await this.findOne(id);
  }

  async findAll() {
    return await this.userRepository.find({
      select: {
        login: true,
        id: true,
        version: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findOne(id: string) {
    const existUser = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!existUser)
      throw new HttpException("User doesn't exist", HttpStatus.NOT_FOUND);

    return await this.userRepository.findOne({
      where: {
        id: id,
      },
      select: {
        login: true,
        id: true,
        version: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const existUser = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    if (!existUser)
      throw new HttpException("User doesn't exist", HttpStatus.NOT_FOUND);
    if (existUser.password !== updateUserDto.oldPassword)
      throw new HttpException('Old password is wrong.', HttpStatus.FORBIDDEN);
    await this.userRepository.update(id, {
      updatedAt: Date.now(),
      password: updateUserDto.newPassword,
      version: existUser.version + 1,
    });
    return await this.findOne(id);
  }

  async remove(id: string) {
    const existUser = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!existUser)
      throw new HttpException("User doesn't exist", HttpStatus.NOT_FOUND);
    await this.userRepository.delete(id);
  }
}
