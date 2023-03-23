/* eslint-disable prettier/prettier */
import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { AuthGuard, RolesGuard } from './common/guards';
import { UserService } from './modules/users/user.service';
import { PaginationInterceptor } from './common/interceptors/pagination.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');
  

  app.useGlobalGuards(
    new AuthGuard(app.get(UserService), new Reflector()),
    new RolesGuard(new Reflector()),
  );

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalInterceptors(new PaginationInterceptor());

  await app.listen(3000);
}
bootstrap();
