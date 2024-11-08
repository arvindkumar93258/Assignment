import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan, MoreThanOrEqual } from 'typeorm';
import { Price, PriceType } from '../entities/price.entity';
import axios from 'axios';

@Injectable()
export class PricesService {
  constructor(
    @InjectRepository(Price)
    private priceRepository: Repository<Price>,
  ) {}

  async fetchAndSavePrice(chain: string, tokenAddress: string, priceType = PriceType.GENERAL, save = true) {
    //direct api call or using node-sdk for reference: https://docs.moralis.com/web3-data-api/evm/reference/get-token-price?address=0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0&chain=eth&include=percent_change
    const url = `https://api.moralis.io/evm/get-token-price?address=${tokenAddress}&chain=${chain}`;
    const response = await axios.get(url, {
      headers: { 'x-api-key': process.env.MORALIS_API_KEY },
    });

    const price = response.data.usdPrice;
    let priceDetails = { chain, price, priceType: priceType, timestamp: new Date() };
    if(save){
      const newPrice = this.priceRepository.create(priceDetails);
      return this.priceRepository.save(newPrice);
    }else{
      return priceDetails;
    }
  }

  async getPricesWithin24Hours(): Promise<Price[]> {
    return await this.priceRepository.find({
      where: {
        chain: 'eth',
        priceType: PriceType.ONE_HOUR,
      },
      order: {
        timestamp: 'DESC',
      },
      take: 24,
    });
  }
  async getPriceOneHourAgo(chain: string): Promise<Price | null> {
    const oneHourAgo = new Date();
    oneHourAgo.setHours(oneHourAgo.getHours() - 1);

    // Find a price record for the chain with type ONE_HOUR and a timestamp close to one hour ago
    return await this.priceRepository.findOne({
      where: {
        chain,
        priceType: PriceType.ONE_HOUR,
        timestamp: MoreThanOrEqual(oneHourAgo),
      },
      order: {
        timestamp: 'DESC',
      },
    });
  }

  async getSwapRate(ethAmount: number) {
    let ethPrice = await this.fetchAndSavePrice('eth', "0x0...", PriceType.GENERAL, false);
    let ploygonPrice = await this.fetchAndSavePrice('btc', '0xdaa...', PriceType.GENERAL, false);
    const ethToBtcRate = ethPrice.price/ploygonPrice.price;

    // Calculate the fee in ETH
    const feeInEth = ethAmount * 0.03;
    // Calculate net ETH after subtracting fee
    const netEthAmount = ethAmount - feeInEth;
    // Calculate BTC equivalent for net ETH amount
    const btcAmount = netEthAmount * ethToBtcRate;

    return {
      "number of btc": btcAmount,
      fee: feeInEth,
    };
  }



}
