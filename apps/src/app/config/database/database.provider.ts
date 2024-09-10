import { Sequelize } from 'sequelize-typescript';
import { User } from '../../module/user/user.entity';

/**
 * read: https://docs.nestjs.com/recipes/sql-sequelize
 * https://docs.nestjs.com/techniques/database#sequelize-integration
 */
export const DatabaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'canhthong',
        database: 'longchou',
      });
      sequelize.addModels([User]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
