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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Price = exports.PriceType = void 0;
const typeorm_1 = require("typeorm");
var PriceType;
(function (PriceType) {
    PriceType["FIVE_MINUTES"] = "FiveMinutes";
    PriceType["ONE_HOUR"] = "OneHour";
    PriceType["GENERAL"] = "General";
})(PriceType || (exports.PriceType = PriceType = {}));
let Price = class Price {
};
exports.Price = Price;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Price.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Price.prototype, "chain", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal'),
    __metadata("design:type", Number)
], Price.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: PriceType,
        default: PriceType.GENERAL
    }),
    __metadata("design:type", String)
], Price.prototype, "priceType", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Price.prototype, "timestamp", void 0);
exports.Price = Price = __decorate([
    (0, typeorm_1.Entity)()
], Price);
//# sourceMappingURL=price.entity.js.map