import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configData from './config/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(configData.port, () =>
    console.log('listening on port ' + configData.port),
  );
}
bootstrap();
