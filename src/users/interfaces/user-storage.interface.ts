import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';
import { UserParams } from './user-params.interface';
import { User } from './user.interface';

export interface UserStorage {
  getUsers: () => UserEntity[];
  getUserById: (id: string) => UserEntity | undefined;
  createUser: (params: CreateUserDto) => UserEntity;
  updateUserPassword: (
    id: string,
    params: UpdateUserDto,
  ) => UserEntity | undefined;
  deleteUser: (id: string) => boolean;
}
