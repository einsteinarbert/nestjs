import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './module/user/user.module';
import { DatabaseProviders } from './config/database/database.provider';


@Module({
  imports: [UserModule],  // Add UserModule to the imports array
  controllers: [AppController],
  providers: [AppService, ...DatabaseProviders], // Register your database providers here
  exports: [...DatabaseProviders],   // Export them if other modules need them
})
export class AppModule { }
