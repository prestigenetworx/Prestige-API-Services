export interface IBusinessApp {
    id?: number;
    name?: string;
    description?: string;
    logoContentType?: string;
    logo?: any;
    street1?: string;
    street2?: string;
    zipcode?: string;
    city?: string;
    state?: string;
    country?: string;
}

export class BusinessApp implements IBusinessApp {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public logoContentType?: string,
        public logo?: any,
        public street1?: string,
        public street2?: string,
        public zipcode?: string,
        public city?: string,
        public state?: string,
        public country?: string
    ) {}
}
