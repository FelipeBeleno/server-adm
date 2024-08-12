import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function main() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3000', 'https://client-adm.vercel.app']
  })
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe(
      {
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true
      }
    )
  )

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Documentation API')
    .setDescription('API Execute proyect')
    .setVersion('1.0')
    .addTag('users')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document, {
    jsonDocumentUrl: 'doc/json',
  });


  const configService = app.get(ConfigService);

  await app.listen(configService.get('PORT') || 3000);
}
main();
