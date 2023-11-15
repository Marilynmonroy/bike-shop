import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { UnauthorizedInterceptor } from './common/errors/interceptors/UnauthorizedInterceptor';
import { NotFoundInterceptor } from './common/errors/interceptors/notfound.Interceptor';
import { ConflictInterceptor } from './common/errors/interceptors/conflict.Interceptor';
import { DatabaseInterceptor } from './common/errors/interceptors/database.Interceptor';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('bikes')
    .setDescription('service orders of a bike store')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(cors());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalInterceptors(new ConflictInterceptor());
  app.useGlobalInterceptors(new DatabaseInterceptor());
  app.useGlobalInterceptors(new UnauthorizedInterceptor());
  app.useGlobalInterceptors(new NotFoundInterceptor());

  app.enableCors({
    origin: [],
    credentials: true,
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
