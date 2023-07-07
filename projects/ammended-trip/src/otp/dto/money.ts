import { WrappedCurrency } from './wrapped-currency';

export type Money = {
    currency: WrappedCurrency;
    cents: number;
};
