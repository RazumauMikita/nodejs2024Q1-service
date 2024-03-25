import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Header,
  HttpException,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { validate } from 'uuid';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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
    return this.usersService.create(createUserDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    if (!validate(id)) {
      throw new HttpException('userId is invalid', HttpStatus.BAD_REQUEST);
    }
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    if (!validate(id)) {
      throw new HttpException('userId is invalid', HttpStatus.BAD_REQUEST);
    }
    await this.usersService.remove(id);
  }
}
