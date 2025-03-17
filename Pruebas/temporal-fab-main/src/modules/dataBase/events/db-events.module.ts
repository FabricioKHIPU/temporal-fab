import { Module } from '@nestjs/common';
import { DbEventsGateway } from './db-events.gateway';
import { RedisService } from '../../redis/redis.service';

@Module({
    providers: [DbEventsGateway, RedisService],
    exports: [DbEventsGateway],
})
export class DbEventsModule { }
