import {Module} from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './module/user/user.module';
import { DatabaseProviders } from './config/database/database.provider';
import { Reflector } from '@nestjs/core';
import { DependencyService } from './config/annotation/dependency.service';
import { DependencyProviders } from './config/annotation/dependency.provider';


@Module({
  imports: [UserModule],  // Add UserModule to the imports array
  controllers: [AppController],
  providers: [
    AppService,
    Reflector,
    ...DatabaseProviders,
    ...DependencyProviders
  ], // Register your database providers here
  exports: [...DatabaseProviders, ...DependencyProviders],   // Export them if other modules need them
})
export class AppModule { }
