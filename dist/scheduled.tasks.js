"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduledTasksService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const price_service_1 = require("./services/price.service");
const alert_service_1 = require("./services/alert.service");
const price_entity_1 = require("./entities/price.entity");
const { google } = require('googleapis');
const CLIENT_ID = 'YOUR_CLIENT_ID';
const CLIENT_SECRET = 'YOUR_CLIENT_SECRET';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = 'YOUR_REFRESH_TOKEN';
const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
let ScheduledTasksService = class ScheduledTasksService {
    constructor(pricesService, alertsService) {
        this.pricesService = pricesService;
        this.alertsService = alertsService;
    }
    async handleCronEveryFiveMinutes() {
        console.log("\n\nCRON Job running after every 5 minutes!!!");
        const ethPrice = await this.pricesService.fetchAndSavePrice('eth', '0x...', price_entity_1.PriceType.FIVE_MINUTES);
        console.log("\n etherium price details is: ", ethPrice);
        const polygonPrice = await this.pricesService.fetchAndSavePrice('polygon', '0x...', price_entity_1.PriceType.FIVE_MINUTES);
        console.log("\n polygon price details is: ", polygonPrice);
        const lastHourPriceOfEth = await this.pricesService.getPriceOneHourAgo("eth");
        const lastHourPriceOfPloygon = await this.pricesService.getPriceOneHourAgo('polygon');
        const percentageIncreaseInEth = ((ethPrice.price - lastHourPriceOfEth.price) / lastHourPriceOfEth.price) * 100;
        const percentageIncreaseInPloygon = ((ethPrice.price - lastHourPriceOfEth.price) / lastHourPriceOfEth.price) * 100;
        if (percentageIncreaseInEth > 3) {
            console.log(`Price increased by more than 3%: ${percentageIncreaseInEth.toFixed(2)}%`);
            await this.alertsService.sendAlertForTriggeredPrice("hyperhire_assignment@hyperhire.in", "etherium", ethPrice.price, lastHourPriceOfEth.price);
        }
        if (percentageIncreaseInPloygon > 3) {
            console.log(`Price increased by more than 3%: ${percentageIncreaseInPloygon.toFixed(2)}%`);
            await this.alertsService.sendAlertForTriggeredPrice("hyperhire_assignment@hyperhire.in", "polygon", ethPrice.price, lastHourPriceOfPloygon.price);
        }
        await this.alertsService.checkAndSendAlert('eth', ethPrice.price);
        await this.alertsService.checkAndSendAlert('polygon', polygonPrice.price);
    }
    async handleCronEveryOneHour() {
        console.log("\n\nCRON Job running after every an hour!!!");
        const ethPrice = await this.pricesService.fetchAndSavePrice('eth', '0x...', price_entity_1.PriceType.ONE_HOUR);
        console.log("\n etherium price details is: ", ethPrice);
        const polygonPrice = await this.pricesService.fetchAndSavePrice('polygon', '0x...', price_entity_1.PriceType.ONE_HOUR);
        console.log("\n polygon price details is: ", polygonPrice);
        await this.alertsService.checkAndSendAlert('eth', ethPrice.price);
        await this.alertsService.checkAndSendAlert('polygon', polygonPrice.price);
    }
};
exports.ScheduledTasksService = ScheduledTasksService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_10_SECONDS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ScheduledTasksService.prototype, "handleCronEveryFiveMinutes", null);
__decorate([
    (0, schedule_1.Cron)('0 * * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ScheduledTasksService.prototype, "handleCronEveryOneHour", null);
exports.ScheduledTasksService = ScheduledTasksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [price_service_1.PricesService,
        alert_service_1.AlertsService])
], ScheduledTasksService);
//# sourceMappingURL=scheduled.tasks.js.map