import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PricesController } from './controllers/price.controller';
import { AlertsService } from './services/alert.service';
import { PricesService } from './services/price.service';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Price } from './entities/price.entity';
import { Alert } from './entities/alert.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { ScheduledTasksService } from './scheduled.tasks';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true // making ConfigModule available globally
    }),
    ScheduleModule.forRoot(),  // Register ScheduleModule here
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: 'assignment-mysql_db-1',  // Use the container name
        port: 3306,
        username: 'root',
        password: '@123',
        database: 'hyperhire',
        // type: 'mysql',
        // host: configService.get<string>('DB_HOST'),
        // port: configService.get<number>('DB_PORT'),
        // username: configService.get<string>('DB_USERNAME'),
        // password: configService.get<string>('DB_PASSWORD'),
        // database: configService.get<string>('DB_NAME'),
        // entities: [Alert, Price],
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,  // Only for development; remove in production
      }),
    }),
    TypeOrmModule.forFeature([Price, Alert]),  // Make sure both entities are listed here
  ],
  controllers: [AppController, PricesController],
  providers: [AppService, AlertsService, PricesService, ScheduledTasksService],
})
export class AppModule {}
