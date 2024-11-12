"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const price_controller_1 = require("./controllers/price.controller");
const alert_service_1 = require("./services/alert.service");
const price_service_1 = require("./services/price.service");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const price_entity_1 = require("./entities/price.entity");
const alert_entity_1 = require("./entities/alert.entity");
const config_1 = require("@nestjs/config");
const schedule_1 = require("@nestjs/schedule");
const scheduled_tasks_1 = require("./scheduled.tasks");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true
            }),
            schedule_1.ScheduleModule.forRoot(),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    type: 'mysql',
                    host: configService.get('DB_HOST'),
                    port: configService.get('DB_PORT'),
                    username: configService.get('DB_USERNAME'),
                    password: configService.get('DB_PASSWORD'),
                    database: configService.get('DB_NAME'),
                    entities: [alert_entity_1.Alert, price_entity_1.Price],
                    synchronize: true,
                }),
            }),
            typeorm_1.TypeOrmModule.forFeature([price_entity_1.Price, alert_entity_1.Alert]),
        ],
        controllers: [app_controller_1.AppController, price_controller_1.PricesController],
        providers: [app_service_1.AppService, alert_service_1.AlertsService, price_service_1.PricesService, scheduled_tasks_1.ScheduledTasksService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map