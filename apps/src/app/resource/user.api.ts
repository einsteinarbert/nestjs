import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from '../service/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("/find-all")
  async findAll() {
    return await this.userService.findAll();
  }

  @Post()
  create(@Body() user: any) {
    return this.userService.create(user);
  }
}