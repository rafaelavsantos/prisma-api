import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // define uma lista com as propriedades que são aceitaveis, nesse caso o DTO
      forbidNonWhitelisted: true, // recusa requisições caso for enviado algo que for enviado fora da whitelist
      transform: true, // transforma automaticamente os dados de uma requisição de acordo com DTO
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
