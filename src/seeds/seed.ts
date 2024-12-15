import { NestFactory } from '@nestjs/core';
import { SeedModule } from './module';
import { SeedService } from './service';

async function seed() {
  const app = await NestFactory.create(SeedModule);
  await app.get(SeedService).run();
  await app.close();
}
seed();
