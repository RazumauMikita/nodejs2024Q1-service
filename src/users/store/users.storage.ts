import { v4 as uuid } from 'uuid';

import { UserParams } from '../interfaces/user-params.interface';
import { UserStorage } from '../interfaces/user-storage.interface';
import { User } from '../interfaces/user.interface';
import { version } from 'os';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class InMemoryUsersStorage implements UserStorage {
  private users: UserEntity[];
  constructor(users: UserEntity[]) {
    this.users = users;
  }

  deleteUser(id: string): boolean {
    const userIndex = this.users.findIndex((elem) => elem.id === id);
    if (!userIndex) return false;
    delete this.users[userIndex];
    return true;
  }

  getUserById(id: string): UserEntity {
    return this.users.find((elem) => elem.id === id);
  }

  getUsers(): UserEntity[] {
    return this.users;
  }
  createUser(params: CreateUserDto): UserEntity {
    const currentTime = new Date().getMilliseconds();
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
  ): UserEntity | undefined {
    const user = this.getUserById(id);
    if (!user) return undefined;
    const doesPasswordMAtch = user.password === params.oldPassword;
    if (doesPasswordMAtch) {
      const currentTime = new Date().getMilliseconds();
      user.password = params.newPassword;
      user.version += 1;
      user.updatedAt = currentTime;
      return user;
    }

    return undefined;
  }
}
