export interface IProductApp {
    id?: number;
    name?: string;
    description?: string;
    value?: number;
    active?: boolean;
    attributes?: any;
    metadataId?: number;
    currencyId?: number;
    businessId?: number;
}

export class ProductApp implements IProductApp {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public value?: number,
        public active?: boolean,
        public attributes?: any,
        public metadataId?: number,
        public currencyId?: number,
        public businessId?: number
    ) {
        this.active = false;
    }
}
