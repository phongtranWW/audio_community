import { MainModule } from '@modules/main';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix('api/v1');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('AUDIO - COMMUNITY - API')
    .setVersion('1.0')
    .setDescription('This api inlcudes 4 resources')
    .addBearerAuth()
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, swaggerDocument);

  await app.listen(3000, () => {
    console.log('API URL: http://localhost:3000/api/v1');
    console.log('DOCS URL: http://localhost:3000/docs');
    console.log('MINIO URL: http://localhost:9090');
  });
}
bootstrap();
