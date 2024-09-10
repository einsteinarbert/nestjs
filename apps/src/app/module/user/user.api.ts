import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("/find-all")
  async findAll() {
    return await this.userService.findAll();
  }

  // @Post("/add")
  // async create(@Body() user: any) {
  //   return await this.userService.create(user);
  // }

  @Post("/by-id")
  async find(@Body() id: number) {
    return await this.userService.findByUserId(id);
  }
}
