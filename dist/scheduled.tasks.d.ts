import { PricesService } from './services/price.service';
import { AlertsService } from './services/alert.service';
export declare class ScheduledTasksService {
    private pricesService;
    private alertsService;
    constructor(pricesService: PricesService, alertsService: AlertsService);
    handleCronEveryFiveMinutes(): Promise<void>;
    handleCronEveryOneHour(): Promise<void>;
}
