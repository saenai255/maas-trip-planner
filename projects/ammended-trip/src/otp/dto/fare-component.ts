import { FeedScopedId } from './feed-scoped-id';
import { Money } from './money';

export type FareComponent = {
    fareId: FeedScopedId;
    price: Money;
    routes: FeedScopedId[];
};
