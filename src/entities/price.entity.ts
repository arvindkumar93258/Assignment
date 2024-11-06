import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
export enum PriceType {
  FIVE_MINUTES = "FiveMinutes",
  ONE_HOUR = "OneHour",
  GENERAL = "General"
}
@Entity()
export class Price {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  chain: string;

  @Column('decimal')
  price: number;

  @Column({
    type: "enum",
    enum: PriceType,
    default: PriceType.GENERAL
  })
  priceType: PriceType;

  @CreateDateColumn()
  timestamp: Date;
}
