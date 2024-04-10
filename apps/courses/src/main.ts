import { NestFactory } from '@nestjs/core';
import { CoursesModule } from './courses.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(CoursesModule);
  const config = app.get(ConfigService);
  await app.listen(config.get('COURSE_PORT'));
}
bootstrap();
