import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PricesService } from './services/price.service';
import { AlertsService } from './services/alert.service';
import { PriceType, Price } from './entities/price.entity';
const { google } = require('googleapis');


const CLIENT_ID = 'YOUR_CLIENT_ID';
const CLIENT_SECRET = 'YOUR_CLIENT_SECRET';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = 'YOUR_REFRESH_TOKEN';

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

@Injectable()
export class ScheduledTasksService {
  constructor(
    private pricesService: PricesService,
    private alertsService: AlertsService,
  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS) //cron-job to run every five minutes
  async handleCronEveryFiveMinutes() {
    console.log("\n\nCRON Job running after every 5 minutes!!!")
    const ethPrice = await this.pricesService.fetchAndSavePrice('eth', '0x...', PriceType.FIVE_MINUTES);
    console.log("\n etherium price details is: ", ethPrice)
    const polygonPrice = await this.pricesService.fetchAndSavePrice('polygon', '0x...', PriceType.FIVE_MINUTES);
    console.log("\n polygon price details is: ", polygonPrice);

    //check for price an houe ago and if it is more than 3% change then send alert to “hyperhire_assignment@hyperhire.in"
    const lastHourPriceOfEth = await this.pricesService.getPriceOneHourAgo("eth");
    const lastHourPriceOfPloygon = await this.pricesService.getPriceOneHourAgo('polygon');
    const percentageIncreaseInEth = ((ethPrice.price - lastHourPriceOfEth.price) / lastHourPriceOfEth.price) * 100;
    const percentageIncreaseInPloygon = ((ethPrice.price - lastHourPriceOfEth.price) / lastHourPriceOfEth.price) * 100;
    if (percentageIncreaseInEth > 3) {
      console.log(`Price increased by more than 3%: ${percentageIncreaseInEth.toFixed(2)}%`);
      await this.alertsService.sendAlertForTriggeredPrice("hyperhire_assignment@hyperhire.in", "etherium", ethPrice.price , lastHourPriceOfEth.price);
    }
    if (percentageIncreaseInPloygon > 3) {
      console.log(`Price increased by more than 3%: ${percentageIncreaseInPloygon.toFixed(2)}%`);
      await this.alertsService.sendAlertForTriggeredPrice("hyperhire_assignment@hyperhire.in", "polygon", ethPrice.price , lastHourPriceOfPloygon.price);
    }

    await this.alertsService.checkAndSendAlert('eth', ethPrice.price);
    await this.alertsService.checkAndSendAlert('polygon', polygonPrice.price);
  }

  @Cron('0 * * * *') //for every an hour
  async handleCronEveryOneHour() {
    console.log("\n\nCRON Job running after every an hour!!!")
    const ethPrice = await this.pricesService.fetchAndSavePrice('eth', '0x...', PriceType.ONE_HOUR, );
    console.log("\n etherium price details is: ", ethPrice)
    const polygonPrice = await this.pricesService.fetchAndSavePrice('polygon', '0x...', PriceType.ONE_HOUR);
    console.log("\n polygon price details is: ", polygonPrice);
    
    await this.alertsService.checkAndSendAlert('eth', ethPrice.price);
    await this.alertsService.checkAndSendAlert('polygon', polygonPrice.price);
  }
}
