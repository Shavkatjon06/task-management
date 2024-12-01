import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix("api")
  const config = new DocumentBuilder()
        .setTitle('Task Management API')
        .setDescription('API documentation for managing users and tasks')
        .setVersion('1.0')
        .addBearerAuth() 
        .build()
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  await app.listen(25000)
}
bootstrap();
