// src/controllers/price.controller.ts
import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { PricesService } from '../services/price.service';
import { AlertsService } from '../services/alert.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';


@ApiTags('Prices')
@Controller('prices')
export class PricesController {
  constructor(
    private pricesService: PricesService,
    private alertsService: AlertsService,
  ) {}

  @ApiOperation({ summary: 'Get prices for the past 24 hours' })
  @Get('history')
  async getPricesWithin24Hours(@Query('chain') chain: string) {
    return this.pricesService.getPricesWithin24Hours(chain);
  }
  
  @ApiOperation({ summary: 'Set an alert for specific price' })
  @Post('set-alert')
  async setAlert(@Body() alertDto: { chain: string; targetPrice: number; email: string }) {
    return this.alertsService.createAlert(alertDto.chain, alertDto.targetPrice, alertDto.email);
  }

  @ApiOperation({summary: "send alert on the set price "})
  @Post('send-alert')
  async sendAlrtForTriggeredPrice(@Body() alertDetails: { email: string, chain: string, newPrice: number, oldPrice: number}){
    return this.alertsService.sendAlertForTriggeredPrice(alertDetails.email, alertDetails.chain, alertDetails.newPrice, alertDetails.oldPrice)
  }

  @Get('swap-rate')
  async getSwapRate(@Query('ethAmount') ethAmount: number) {
    return this.pricesService.getSwapRate(ethAmount);
  }
}
