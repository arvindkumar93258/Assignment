export declare enum PriceType {
    FIVE_MINUTES = "FiveMinutes",
    ONE_HOUR = "OneHour",
    GENERAL = "General"
}
export declare class Price {
    id: number;
    chain: string;
    price: number;
    priceType: PriceType;
    timestamp: Date;
}
