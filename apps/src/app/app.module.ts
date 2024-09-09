import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './config.module/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql', // Use 'mysql' since MariaDB is compatible with MySQL
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'canhthong',
      database: 'longchou',
      entities: [], // Add your entities here if you're using TypeORM entities
      synchronize: true, // Set to false in production
    })
  ],  // Add UserModule to the imports array
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
