import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { config } from '@config/config';
import '@config/set-database-url';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const appConfig = new DocumentBuilder()
    .setTitle('Crypto Exchange API')
    .setDescription('API for the exchange rate')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, appConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(config.app.port);
}

bootstrap();
