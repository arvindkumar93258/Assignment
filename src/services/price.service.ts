import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import { Price, PriceType } from '../entities/price.entity';
import axios from 'axios';

@Injectable()
export class PricesService {
  constructor(
    @InjectRepository(Price)
    private priceRepository: Repository<Price>,
  ) {}

  async fetchAndSavePrice(chain: string, tokenAddress: string, priceType = PriceType.GENERAL) {
    //direct api call or using node-sdk for reference: https://docs.moralis.com/web3-data-api/evm/reference/get-token-price?address=0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0&chain=eth&include=percent_change
    const url = `https://api.moralis.io/evm/get-token-price?address=${tokenAddress}&chain=${chain}`;
    const response = await axios.get(url, {
      headers: { 'x-api-key': process.env.MORALIS_API_KEY },
    });

    const price = response.data.usdPrice;
    const newPrice = this.priceRepository.create({ chain, price, priceType: priceType, timestamp: new Date() });
    return this.priceRepository.save(newPrice);
  }

  async getPricesWithin24Hours(chain: string) {
    const yesterday = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
    return this.priceRepository.find({ where: { chain, timestamp: MoreThan(yesterday) } });
  }
}
