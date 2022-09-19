import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  )
  
  app.enableCors({
    origin: true,
    credentials: true
  });

  app.setGlobalPrefix('api');

  await app.listen(AppModule.port, () => {

    console.log('App corriendo en puerto ', AppModule.port);
  
  });
}
bootstrap();

/**
 * 
 * const jsonData=pm.response.json();

  pm.test('token guardado',()=>{
      pm.response.to.have.status(200);
      pm.environment.set('TokenRansa',jsonData.token);
  })
 * 
 */