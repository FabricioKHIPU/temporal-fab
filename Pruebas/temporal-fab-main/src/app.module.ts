import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { mysqlConfig, postgresConfig } from './config/database.config';
import { RedisModule } from './modules/redis/redis.module';
import { AuthModule } from './modules/auth/auth.module';
import { AppController } from './app.controller';
import { GraphqlModule } from './modules/graphql/graphql.module';
import { LotModule } from './modules/lot/lot.module';
import { PostgresModule } from './modules/dataBase/postgres/postgres.module';
import { DbEventsModule } from './modules/dataBase/events/db-events.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      name: 'mysqlConnection',
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: mysqlConfig,
    }),
    TypeOrmModule.forRootAsync({
      name: 'postgresConnection',
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: postgresConfig,
    }),
    RedisModule,
    AuthModule,
    GraphqlModule,
    LotModule,
    PostgresModule,
    DbEventsModule,
  ],
  controllers: [AppController],
})
export class AppModule { }
