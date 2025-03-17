import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const mysqlConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  type: 'mysql',
  host: configService.get<string>('DB_HOST_MYSQL'),
  port: configService.get<number>('DB_PORT_MYSQL'),
  username: configService.get<string>('DB_USER_MYSQL'),
  password: configService.get<string>('DB_PASSWORD_MYSQL'),
  database: configService.get<string>('DB_NAME_MYSQL'),
//   entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
//   synchronize: true, 
});

export const postgresConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get<string>('DB_HOST_POSTGRES'),
  port: configService.get<number>('DB_PORT_POSTGRES'),
  username: configService.get<string>('DB_USER_POSTGRES'),
  password: configService.get<string>('DB_PASSWORD_POSTGRESS'),
  database: configService.get<string>('DB_NAME_POSTGRES'),
//   entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
//   synchronize: true, 
});
