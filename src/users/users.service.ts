import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserStorage } from './interfaces/user-storage.interface';
import { InMemoryUsersStorage } from './store/users.storage';

@Injectable()
export class UsersService {
  constructor(@Inject('UserStore') private storage: UserStorage) {}
  create(createUserDto: CreateUserDto) {
    return this.storage.createUser(createUserDto);
  }

  findAll() {
    return this.storage.getUsers();
  }

  findOne(id: string) {
    return this.storage.getUserById(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.storage.updateUserPassword(id, updateUserDto);
  }

  remove(id: string) {
    return this.storage.deleteUser(id);
  }
}
