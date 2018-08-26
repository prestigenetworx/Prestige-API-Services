export interface ICurrencyApp {
    id?: number;
    name?: string;
    symbol?: string;
    hash?: string;
    blockchainId?: number;
}

export class CurrencyApp implements ICurrencyApp {
    constructor(public id?: number, public name?: string, public symbol?: string, public hash?: string, public blockchainId?: number) {}
}
