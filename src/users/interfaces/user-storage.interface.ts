import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';

export type UpdatePasswordError =
  | 'Old password is wrong.'
  | "User doesn't exist";
export interface UserStorage {
  getUsers: () => UserEntity[];
  getUserById: (id: string) => UserEntity | undefined;
  createUser: (params: CreateUserDto) => UserEntity;
  updateUserPassword: (
    id: string,
    params: UpdateUserDto,
  ) => UserEntity | UpdatePasswordError;
  deleteUser: (id: string) => boolean;
}
