import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PricesService } from './services/price.service';
import { AlertsService } from './services/alert.service';
import { PriceType } from './entities/price.entity';

@Injectable()
export class ScheduledTasksService {
  constructor(
    private pricesService: PricesService,
    private alertsService: AlertsService,
  ) {}

  @Cron(CronExpression.EVERY_5_MINUTES) //cron-job to run every five minutes
  async handleCronEveryFiveMinutes() {
    const ethPrice = await this.pricesService.fetchAndSavePrice('eth', '0x...', PriceType.FIVE_MINUTES);
    const polygonPrice = await this.pricesService.fetchAndSavePrice('polygon', '0x...', PriceType.FIVE_MINUTES);
    
    await this.alertsService.checkAndSendAlert('eth', ethPrice.price);
    await this.alertsService.checkAndSendAlert('polygon', polygonPrice.price);
  }

  @Cron(CronExpression.EVERY_5_MINUTES) //for every an hour
  async handleCronEveryOneHour() {
    const ethPrice = await this.pricesService.fetchAndSavePrice('eth', '0x...', PriceType.ONE_HOUR, );
    const polygonPrice = await this.pricesService.fetchAndSavePrice('polygon', '0x...', PriceType.ONE_HOUR);
    
    await this.alertsService.checkAndSendAlert('eth', ethPrice.price);
    await this.alertsService.checkAndSendAlert('polygon', polygonPrice.price);
  }
}
