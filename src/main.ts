import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { setupCloudinary } from './config/cloudinary.config';

async function bootstrap() {
  setupCloudinary();
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      disableErrorMessages: false

    })
  )
   const config = new DocumentBuilder()
    .setTitle('Grocery App')
    .setDescription('')
    .setVersion('1.0')
    .addTag('grocery')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory);
  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);
  console.log(`App running on port ${port}`);
}
bootstrap();
