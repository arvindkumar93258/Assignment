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
exports.PricesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const price_entity_1 = require("../entities/price.entity");
const axios_1 = require("axios");
let PricesService = class PricesService {
    constructor(priceRepository) {
        this.priceRepository = priceRepository;
    }
    async fetchAndSavePrice(chain, tokenAddress, priceType = price_entity_1.PriceType.GENERAL, save = true) {
        const url = `https://api.moralis.io/evm/get-token-price?address=${tokenAddress}&chain=${chain}`;
        const response = await axios_1.default.get(url, {
            headers: { 'x-api-key': process.env.MORALIS_API_KEY },
        });
        const price = response.data.usdPrice;
        let priceDetails = { chain, price, priceType: priceType, timestamp: new Date() };
        if (save) {
            const newPrice = this.priceRepository.create(priceDetails);
            return this.priceRepository.save(newPrice);
        }
        else {
            return priceDetails;
        }
    }
    async getPricesWithin24Hours(chain) {
        return await this.priceRepository.find({
            where: {
                chain: chain,
                priceType: price_entity_1.PriceType.ONE_HOUR,
            },
            order: {
                timestamp: 'DESC',
            },
            take: 24,
        });
    }
    async getPriceOneHourAgo(chain) {
        const oneHourAgo = new Date();
        oneHourAgo.setHours(oneHourAgo.getHours() - 1);
        return await this.priceRepository.findOne({
            where: {
                chain,
                priceType: price_entity_1.PriceType.ONE_HOUR,
                timestamp: (0, typeorm_2.MoreThanOrEqual)(oneHourAgo),
            },
            order: {
                timestamp: 'DESC',
            },
        });
    }
    async getSwapRate(ethAmount) {
        let ethPrice = await this.fetchAndSavePrice('eth', "0x0...", price_entity_1.PriceType.GENERAL, false);
        let ploygonPrice = await this.fetchAndSavePrice('btc', '0xdaa...', price_entity_1.PriceType.GENERAL, false);
        const ethToBtcRate = ethPrice.price / ploygonPrice.price;
        const feeInEth = ethAmount * 0.03;
        const netEthAmount = ethAmount - feeInEth;
        const btcAmount = netEthAmount * ethToBtcRate;
        return {
            "number of btc": btcAmount,
            fee: feeInEth,
        };
    }
};
exports.PricesService = PricesService;
exports.PricesService = PricesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(price_entity_1.Price)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PricesService);
//# sourceMappingURL=price.service.js.map