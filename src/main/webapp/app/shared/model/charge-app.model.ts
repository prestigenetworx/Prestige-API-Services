export interface IChargeApp {
    id?: number;
    amount?: number;
    transaction?: string;
    description?: string;
    addressFrom?: string;
    addressTo?: string;
    completed?: boolean;
    blockchainTx?: string;
    metadataId?: number;
    currencyId?: number;
    customerId?: number;
}

export class ChargeApp implements IChargeApp {
    constructor(
        public id?: number,
        public amount?: number,
        public transaction?: string,
        public description?: string,
        public addressFrom?: string,
        public addressTo?: string,
        public completed?: boolean,
        public blockchainTx?: string,
        public metadataId?: number,
        public currencyId?: number,
        public customerId?: number
    ) {
        this.completed = false;
    }
}
