import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AuthGuard, RolesGuard } from './common/guards';
import { UserService } from './modules/users/user.service';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');
  app.useGlobalGuards(
    new AuthGuard(app.get(UserService), new Reflector()),
    new RolesGuard(new Reflector()),
  );
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
