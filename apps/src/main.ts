import { Logger } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import cookieParser = require('cookie-parser');

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { DependencyService } from './app/config/annotation/dependency.service';
import { getService, initializeDependencyService } from './app/config/annotation/decorator/transactional.decorator';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // Apply the TransactionInterceptor globally
  // Use dependency injection to get the required dependencies
  const reflector = app.get(Reflector);    // Get Reflector instance
  const sequelize = app.get("SEQUELIZE");    // Get Sequelize instance
  if (!getService()) {
    initializeDependencyService(new DependencyService(reflector, sequelize));
  }

  // app.useGlobalInterceptors(new TransactionInterceptor(reflector, sequelize));

  const port = process.env.PORT || 8080;
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.use(cookieParser());
  app.setGlobalPrefix(environment.globalPrefix);
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${environment.globalPrefix}`
  );
}

bootstrap();
