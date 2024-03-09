import { v4 as uuid } from 'uuid';

import { UserParams } from '../interfaces/user-params.interface';
import { UserStorage } from '../interfaces/user-storage.interface';
import { User } from '../interfaces/user.interface';
import { version } from 'os';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';

export type UpdatePasswordError =
  | 'Old password is wrong.'
  | "User doesn't exist";

@Injectable()
export class InMemoryUsersStorage implements UserStorage {
  private users: UserEntity[] = [];
  constructor() {}

  deleteUser(id: string): boolean {
    const user = this.users.find((elem) => elem.id === id);
    const isUserExist = user ? true : false;
    if (isUserExist) {
      this.users = this.users.filter((elem) => elem.id !== id);
    }
    return isUserExist;
  }

  getUserById(id: string): UserEntity {
    return this.users.find((elem) => elem.id === id);
  }

  getUsers(): UserEntity[] {
    return this.users;
  }
  createUser(params: CreateUserDto): UserEntity {
    const currentTime = Date.now();
    const newUser: UserEntity = {
      ...params,
      id: uuid(),
      version: 1,
      createdAt: currentTime,
      updatedAt: currentTime,
    };
    this.users.push(newUser);
    return newUser;
  }

  updateUserPassword(
    id: string,
    params: UpdateUserDto,
  ): UserEntity | UpdatePasswordError {
    const user = this.getUserById(id);
    if (!user) return "User doesn't exist";
    const doesPasswordMAtch = user.password === params.oldPassword;
    if (doesPasswordMAtch) {
      const currentTime = Date.now();
      user.password = params.newPassword;
      user.version += 1;
      user.updatedAt = currentTime;
      return user;
    } else {
      return 'Old password is wrong.';
    }
  }
}
