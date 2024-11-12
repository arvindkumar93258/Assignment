import { PricesService } from '../services/price.service';
import { AlertsService } from '../services/alert.service';
export declare class PricesController {
    private pricesService;
    private alertsService;
    constructor(pricesService: PricesService, alertsService: AlertsService);
    getPricesWithin24Hours(chain: string): Promise<import("../entities/price.entity").Price[]>;
    setAlert(alertDto: {
        chain: string;
        targetPrice: number;
        email: string;
    }): Promise<import("../entities/alert.entity").Alert>;
    sendAlrtForTriggeredPrice(alertDetails: {
        email: string;
        chain: string;
        newPrice: number;
        oldPrice: number;
    }): Promise<void>;
    getSwapRate(ethAmount: number): Promise<{
        "number of btc": number;
        fee: number;
    }>;
}
