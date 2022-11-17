import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { v4 as uuid } from 'uuid';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // esto hace conflicto a la hora de realizar la conversion de datos con el class-transofrmer

  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //     forbidNonWhitelisted: true,
  //     transform: true,
  //     transformOptions: {
  //       enableImplicitConversion: true
  //     }
  //   })
  // );
  
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