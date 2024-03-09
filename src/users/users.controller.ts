import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Header,
  HttpException,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { validate } from 'uuid';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @HttpCode(200)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  findOne(@Param('id') id: string) {
    if (!validate(id)) {
      throw new HttpException('userId is invalid', HttpStatus.BAD_REQUEST);
    }
    const user = this.usersService.findOne(id);
    if (!user) {
      throw new HttpException("User doesn't exist", HttpStatus.NOT_FOUND);
    }
    return user;
  }

  @Post()
  @HttpCode(201)
  @Header('Content-Type', 'application/json')
  create(@Body() createUserDto: CreateUserDto) {
    const response = Object.assign({}, this.usersService.create(createUserDto));
    delete response.password;
    return response;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    if (!validate(id)) {
      throw new HttpException('userId is invalid', HttpStatus.BAD_REQUEST);
    }
    const updatedUser = this.usersService.update(id, updateUserDto);
    if (updatedUser === 'Old password is wrong.') {
      throw new HttpException('Old password is wrong.', HttpStatus.FORBIDDEN);
    }

    if (updatedUser === "User doesn't exist") {
      throw new HttpException("User doesn't exist", HttpStatus.NOT_FOUND);
    }
    const response = Object.assign({}, updatedUser);
    delete response.password;
    return response;
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    if (!validate(id)) {
      throw new HttpException('userId is invalid', HttpStatus.BAD_REQUEST);
    }
    const response = this.usersService.remove(id);
    if (!response) {
      throw new HttpException("User doesn't exist", HttpStatus.NOT_FOUND);
    }
  }
}
