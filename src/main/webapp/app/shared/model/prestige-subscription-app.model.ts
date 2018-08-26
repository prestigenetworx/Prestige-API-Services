import { Moment } from 'moment';

export const enum SubscriptionType {
    MONTHLY = 'MONTHLY',
    WEEKLY = 'WEEKLY',
    DAILY = 'DAILY',
    YEARLY = 'YEARLY',
    TWOWEEKS = 'TWOWEEKS',
    THREEMONTHS = 'THREEMONTHS',
    SIXMONTHS = 'SIXMONTHS'
}

export interface IPrestigeSubscriptionApp {
    id?: number;
    description?: string;
    type?: SubscriptionType;
    startDate?: Moment;
    endDate?: Moment;
    renewalDate?: Moment;
    currencyId?: number;
    customerId?: number;
    productId?: number;
}

export class PrestigeSubscriptionApp implements IPrestigeSubscriptionApp {
    constructor(
        public id?: number,
        public description?: string,
        public type?: SubscriptionType,
        public startDate?: Moment,
        public endDate?: Moment,
        public renewalDate?: Moment,
        public currencyId?: number,
        public customerId?: number,
        public productId?: number
    ) {}
}
