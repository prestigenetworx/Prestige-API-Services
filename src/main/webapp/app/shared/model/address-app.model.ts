export const enum AddressType {
    SHIPPING = 'SHIPPING',
    BILLING = 'BILLING'
}

export interface IAddressApp {
    id?: number;
    street1?: string;
    street2?: string;
    zipcode?: string;
    city?: string;
    state?: string;
    country?: string;
    type?: AddressType;
    customerId?: number;
}

export class AddressApp implements IAddressApp {
    constructor(
        public id?: number,
        public street1?: string,
        public street2?: string,
        public zipcode?: string,
        public city?: string,
        public state?: string,
        public country?: string,
        public type?: AddressType,
        public customerId?: number
    ) {}
}
