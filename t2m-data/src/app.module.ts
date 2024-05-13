import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { DatabaseModule } from './database/database.module';
require('dotenv').config()

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: process.env.MONGODB_URL,
        connectionFactory: (connection) => {
          connection.plugin(softDeletePlugin);
          return connection;
        }
      })
    }),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
