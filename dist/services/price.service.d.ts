import { Repository } from 'typeorm';
import { Price, PriceType } from '../entities/price.entity';
export declare class PricesService {
    private priceRepository;
    constructor(priceRepository: Repository<Price>);
    fetchAndSavePrice(chain: string, tokenAddress: string, priceType?: PriceType, save?: boolean): Promise<{
        chain: string;
        price: any;
        priceType: PriceType;
        timestamp: Date;
    }>;
    getPricesWithin24Hours(chain: string): Promise<Price[]>;
    getPriceOneHourAgo(chain: string): Promise<Price | null>;
    getSwapRate(ethAmount: number): Promise<{
        "number of btc": number;
        fee: number;
    }>;
}
