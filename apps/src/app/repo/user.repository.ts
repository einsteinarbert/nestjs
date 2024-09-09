import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class UserRepository {
  private readonly user = [{
    name: "HieuTT77",
    user_id: "1"
  }];

  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
  ) { }

  async findAll() {
    const sql = `SELECT * FROM user;`;
    return await this.dataSource.query(sql);
  }

  async save(user: any) {
    this.user.push(user);
    return user;
  }
}