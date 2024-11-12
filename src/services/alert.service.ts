import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alert } from '../entities/alert.entity';
import * as nodemailer from 'nodemailer';
const { google } = require('googleapis');

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URI = process.env.REDIRECT_URI
const REFRESH_TOKEN = process.env.REFRESH_TOKEN

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

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
  async sendAlertForTriggeredPrice(email: string, chain: string, newPrice: number, oldPrice: number) {
    await this.sendEmail(email, chain, newPrice);    
  }
  private async sendEmail(email: string, chain: string, price: number, oldPrice = 0) {
    console.log(`Sending email to ${email} for chain ${chain} for price ${price} ${oldPrice? " old price was : ": ""}`+ oldPrice? oldPrice: "");
    //send email using gmail account
    const accessToken = await oAuth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'arvindkumar93258@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: 'arvindkumar93258@gmail.com',
      to: email,
      subject: `Price Alert: Trigger activated for ${chain}`,
      text: `This is a test email sent using SendGrid SMTP. Price for chain ${chain} has been hit for ${price}`,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent...', result);

    //using smtp twilio/sendgrid
    // const transporter = nodemailer.createTransport({
    //   host: 'smtp.sendgrid.net',
    //   port: 587,
    //   auth: {
    //     user: 'apikey', // SendGrid uses "apikey" as the username
    //     pass: process.env.SENDGRID_API_KEY,
    //   },
    // });

    // const mailOptions = {
    //   from: 'arvindkumar93258@gmai.com',
    //   to: email,
    //   subject: `Price Alert: Trigger activated for ${chain}`,
    //   text: `This is a test email sent using SendGrid SMTP. Price for chain ${chain} has been hit for ${price}`,
    // };
    // transporter.sendMail(mailOptions, (error, info) => {
    //   if (error) {
    //     console.log('Error:', error);
    //   } else {
    //     console.log('Email sent successfully:', info.response);
    //   }
    // });

    
  }
}
