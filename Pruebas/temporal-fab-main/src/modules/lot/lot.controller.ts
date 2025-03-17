import { Controller, Get, Query } from '@nestjs/common';
import { LotService } from './lot.service';

@Controller('lot')
export class LotController {
  constructor(private readonly lotService: LotService) {}

  @Get()
  async getLots(@Query('startDate') startDate: string) {
    if (!startDate) {
      return { error: 'El parámetro startDate es obligatorio (formato YYYY-MM-DD)' };
    }
    return await this.lotService.getLots(startDate);
  }
}