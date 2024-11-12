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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PricesController = void 0;
const common_1 = require("@nestjs/common");
const price_service_1 = require("../services/price.service");
const alert_service_1 = require("../services/alert.service");
const swagger_1 = require("@nestjs/swagger");
let PricesController = class PricesController {
    constructor(pricesService, alertsService) {
        this.pricesService = pricesService;
        this.alertsService = alertsService;
    }
    async getPricesWithin24Hours(chain) {
        return this.pricesService.getPricesWithin24Hours(chain);
    }
    async setAlert(alertDto) {
        return this.alertsService.createAlert(alertDto.chain, alertDto.targetPrice, alertDto.email);
    }
    async sendAlrtForTriggeredPrice(alertDetails) {
        return this.alertsService.sendAlertForTriggeredPrice(alertDetails.email, alertDetails.chain, alertDetails.newPrice, alertDetails.oldPrice);
    }
    async getSwapRate(ethAmount) {
        return this.pricesService.getSwapRate(ethAmount);
    }
};
exports.PricesController = PricesController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get prices for the past 24 hours' }),
    (0, common_1.Get)('history'),
    __param(0, (0, common_1.Query)('chain')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PricesController.prototype, "getPricesWithin24Hours", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Set an alert for specific price' }),
    (0, common_1.Post)('set-alert'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PricesController.prototype, "setAlert", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "send alert on the set price " }),
    (0, common_1.Post)('send-alert'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PricesController.prototype, "sendAlrtForTriggeredPrice", null);
__decorate([
    (0, common_1.Get)('swap-rate'),
    __param(0, (0, common_1.Query)('ethAmount')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PricesController.prototype, "getSwapRate", null);
exports.PricesController = PricesController = __decorate([
    (0, swagger_1.ApiTags)('Prices'),
    (0, common_1.Controller)('prices'),
    __metadata("design:paramtypes", [price_service_1.PricesService,
        alert_service_1.AlertsService])
], PricesController);
//# sourceMappingURL=price.controller.js.map