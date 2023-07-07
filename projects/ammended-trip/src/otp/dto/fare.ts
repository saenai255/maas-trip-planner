import { FareComponent } from './fare-component';
import { Money } from './money';

export type Fare = {
    fare: Money;
    details: FareComponent[];
};
