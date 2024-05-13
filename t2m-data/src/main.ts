import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { TransformInterceptor } from './core/transform.interceptor';
require('dotenv').config()


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector)

  //Sửa lỗi CORS, trường origin dùng để định nghĩa các domain có thể truy cập backend
  app.enableCors({
    "origin": true,
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    credentials: true
  });

  //Khai báo đánh dấu version cho API
  app.setGlobalPrefix('stock')
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: ['1']
  });

  //Khai báo intercepter global để chuẩn hoá dữ liệu đầu ra
  app.useGlobalInterceptors(new TransformInterceptor(reflector));

  await app.listen(process.env.PORT);
}
bootstrap();
