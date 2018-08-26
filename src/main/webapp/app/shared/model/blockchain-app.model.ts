export interface IBlockchainApp {
    id?: number;
    name?: string;
    symbol?: string;
}

export class BlockchainApp implements IBlockchainApp {
    constructor(public id?: number, public name?: string, public symbol?: string) {}
}
