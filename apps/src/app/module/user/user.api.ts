import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { Transaction } from 'sequelize';
import { Transactional } from '../../config/annotation/decorator/transactional.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("/find-all")
  async findAll() {
    return await this.userService.findAll();
  }

  /**
   * Test transaction annotation
   * @param id user id
   * @param user updating data
   * @returns: TODO
   */
  @Transactional()
  @Post("/update/:id")
  async create(@Param('id', new ParseIntPipe()) id,  @Body() user: User) {
    return await this.userService.updateUserData(id, user);
  }

  @Post("/by-id")
  async find(@Body() id: number) {
    return await this.userService.findByUserId(id);
  }
}
