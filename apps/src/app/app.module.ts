import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserController } from './resource/user.api';
import { UserService } from './service/user.service';
import { UserRepository } from './repo/user.repository';
import { UserModule } from './config.module/user.module';

@Module({
  imports: [UserModule],  // Add UserModule to the imports array
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
