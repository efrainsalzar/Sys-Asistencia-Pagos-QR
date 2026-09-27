import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule, /*ObserveInstrument*/ } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // instrument: ObserveInstrument,
  });
  const configService = app.get(ConfigService);
  const port = configService.get('app.port');
  await app.listen(port);
}
bootstrap().catch((error) => {
  console.error(error);
  process.exit(1);
});
