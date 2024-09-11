import { Inject, Injectable } from '@nestjs/common';
import { Sequelize, QueryTypes } from 'sequelize';
import { User } from './user.entity';
import { UserDetailDto } from './dto/user.details.dto';
import { Transactional } from '../../config/annotation/decorator/transactional.decorator';

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

  @Transactional() // Áp dụng transaction TODO: not work at here
  async updateUserData(id: number, updateData: any): Promise<void> {
    await this.userRepository.update(updateData, {
      where: { user_id: id },
    });
  }

  readonly sql =
    `select u.name user_name, u.user_id, s.shop_name from user u
      join user_shop us on us.user_id = u.user_id
      join shop s on us.shop_id = s.shop_id
      where u.user_id = $userId
    `;
}
