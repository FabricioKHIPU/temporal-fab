import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { RedisService } from '../../redis/redis.service';

@Injectable()
export class PostgresService {
  constructor(
    @InjectConnection('postgresConnection')
    private readonly connection: Connection,
    private readonly redisService: RedisService,
  ) { }

  async getTables(): Promise<any[]> {
    const cacheKey = 'postgres:tables';
    const cachedData = await this.redisService.get(cacheKey);

    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const query = `
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public';
    `;
    const result = await this.connection.query(query);


    await this.redisService.set(cacheKey, JSON.stringify(result), 3600);

    return result;
  }

  async sayHello(): Promise<any> {
    return { message: 'Hello world' };
  }
}
