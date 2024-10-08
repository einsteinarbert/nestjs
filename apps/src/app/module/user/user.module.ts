import { Module } from '@nestjs/common';
import { UserController } from './user.api';
import { UserService } from './user.service';
import { userProviders } from './user.providers';
import { DatabaseModule } from '../../config/database/database.module';
import { DatabaseProviders } from '../../config/database/database.provider';
import { DependencyProviders } from '../../config/annotation/dependency.provider';


@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [
    UserService,
    ...userProviders,
    ...DependencyProviders
  ],
})
export class UserModule {}
