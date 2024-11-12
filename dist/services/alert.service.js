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
exports.AlertsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const alert_entity_1 = require("../entities/alert.entity");
const nodemailer = require("nodemailer");
const { google } = require('googleapis');
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
let AlertsService = class AlertsService {
    constructor(alertRepository) {
        this.alertRepository = alertRepository;
    }
    async createAlert(chain, targetPrice, email) {
        const newAlert = this.alertRepository.create({ chain, targetPrice, email });
        return this.alertRepository.save(newAlert);
    }
    async checkAndSendAlert(chain, newPrice) {
        const alerts = await this.alertRepository.find({ where: { chain, triggered: false } });
        for (const alert of alerts) {
            if (newPrice >= alert.targetPrice) {
                this.sendEmail(alert.email, chain, newPrice);
                alert.triggered = true;
                await this.alertRepository.save(alert);
            }
        }
    }
    async sendAlertForTriggeredPrice(email, chain, newPrice, oldPrice) {
        await this.sendEmail(email, chain, newPrice);
    }
    async sendEmail(email, chain, price, oldPrice = 0) {
        console.log(`Sending email to ${email} for chain ${chain} for price ${price} ${oldPrice ? " old price was : " : ""}` + oldPrice ? oldPrice : "");
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
    }
};
exports.AlertsService = AlertsService;
exports.AlertsService = AlertsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(alert_entity_1.Alert)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AlertsService);
//# sourceMappingURL=alert.service.js.map