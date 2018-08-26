export interface ICustomerApp {
    id?: number;
    name?: string;
    description?: string;
    email?: string;
    phone?: string;
    metadataId?: number;
}

export class CustomerApp implements ICustomerApp {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public email?: string,
        public phone?: string,
        public metadataId?: number
    ) {}
}
