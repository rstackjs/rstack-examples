import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  if (import.meta.webpackHot) {
    import.meta.webpackHot.accept();
    import.meta.webpackHot.dispose(() => app.close());
  }
}
bootstrap();
