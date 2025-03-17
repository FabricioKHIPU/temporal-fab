import { Controller, Get, Post } from '@nestjs/common';
import { PostgresService } from './postgres.service';

@Controller('postgres')
export class PostgresController {
  constructor(private readonly postgresService: PostgresService) {}

  @Get('tables')
  async getTables() {
    return await this.postgresService.getTables();
  }

  @Post('hello')
  async sayHello() {
    return await this.postgresService.sayHello();
  }
}
