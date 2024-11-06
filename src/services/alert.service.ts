import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alert } from '../entities/alert.entity';
import nodemailer from 'nodemailer';

@Injectable()
export class AlertsService {
  constructor(
    @InjectRepository(Alert)
    private alertRepository: Repository<Alert>,
  ) {}

  async createAlert(chain: string, targetPrice: number, email: string) {
    const newAlert = this.alertRepository.create({ chain, targetPrice, email });
    return this.alertRepository.save(newAlert);
  }
  
  async checkAndSendAlert(chain: string, newPrice: number) {
    const alerts = await this.alertRepository.find({ where: { chain, triggered: false } });

    for (const alert of alerts) {
      if (newPrice >= alert.targetPrice) {
        this.sendEmail(alert.email, chain, newPrice);
        alert.triggered = true;
        await this.alertRepository.save(alert);
      }
    }
  }

  private async sendEmail(email: string, chain: string, price: number) {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Alert: ${chain} Price Alert`,
      text: `The price of ${chain} has reached ${price}.`,
    });
  }
}
