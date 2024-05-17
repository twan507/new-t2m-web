import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '14.225.192.30',
      port: 3306,
      username: 'twan',
      password: 'chodom',
      database: 't2m',
      extra: {
        connectionLimit: 10,
      },
      // Thiết lập múi giờ cho kết nối
      timezone: 'Z',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
})
export class AppModule { }
