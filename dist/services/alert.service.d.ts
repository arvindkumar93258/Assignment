import { Repository } from 'typeorm';
import { Alert } from '../entities/alert.entity';
export declare class AlertsService {
    private alertRepository;
    constructor(alertRepository: Repository<Alert>);
    createAlert(chain: string, targetPrice: number, email: string): Promise<Alert>;
    checkAndSendAlert(chain: string, newPrice: number): Promise<void>;
    sendAlertForTriggeredPrice(email: string, chain: string, newPrice: number, oldPrice: number): Promise<void>;
    private sendEmail;
}
