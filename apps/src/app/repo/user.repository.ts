import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  private readonly users = [{
    name: "HieuTT77",
    level: "SA"
  }];

  findAll() {
    return this.users;
  }

  save(user: any) {
    this.users.push(user);
    return user;
  }
}