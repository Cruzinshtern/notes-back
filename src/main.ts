import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ErrorsInterceptor } from "./interceptors/error.interceptor";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalInterceptors(new ErrorsInterceptor());
  await app.listen(3001, () => console.log('Server running on 3001'));
}
bootstrap();
