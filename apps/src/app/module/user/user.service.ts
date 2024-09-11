import { Inject, Injectable } from '@nestjs/common';
import { Sequelize, QueryTypes } from 'sequelize';
import { User } from './user.entity';
import { UserDetailDto } from './dto/user.details.dto';
import { Log4js } from '../../config/annotation/decorator/log.decorator';
import { Transactional, getService } from '../../config/annotation/decorator/transactional.decorator';
import { DependencyService } from '../../config/annotation/dependency.service';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: typeof User,

    @Inject('SEQUELIZE') // Inject the custom Sequelize provider
    private readonly sequelize: Sequelize,
  ) { }

  /**
   * find all users in `user` table
   * @returns
   */
  async findAll(): Promise<User[]> {
    return this.userRepository.findAll<User>();
  }

  /**
   * https://sequelize.org/docs/v6/core-concepts/raw-queries/
   * Example named native query
   * @param id userId
   * @returns list user & shop
   */
  async findByUserId(id: number): Promise<UserDetailDto[]> {
    console.log("Id: " + JSON.stringify(id));
    const args = { id };
    // Execute native SQL query
    const results = await this.sequelize.query(this.sql,
      {
        bind: { userId: id["id"] },  // Use bind for named parameters
        type: QueryTypes.SELECT
      });

    // Ánh xạ kết quả SQL sang DTO
    return results.map(u => new UserDetailDto(u));
  }

  @Transactional()
  async updateUserData(id: number, updateData: any): Promise<void> {
    console.log("Id json?: " + JSON.stringify(id));
    console.log("Id: " + id);
    const _results = await this.sequelize.query(this.sqlUpdate,
      {
        bind: { id: id, name: updateData["name"] },  // Use bind for named parameters
        type: QueryTypes.UPDATE
      });
    if (id == 2) {
      throw Error("Testing rollback when id = 2");
    }
  }

  readonly sqlUpdate = `
    update user set name = $name where user_id = $id
  `;
  readonly sql =
    `select u.name user_name, u.user_id, s.shop_name from user u
      join user_shop us on us.user_id = u.user_id
      join shop s on us.shop_id = s.shop_id
      where u.user_id = $userId
    `;
}
