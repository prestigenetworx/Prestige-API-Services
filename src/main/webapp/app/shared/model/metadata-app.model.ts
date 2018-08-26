export interface IMetadataApp {
    id?: number;
    metadata?: any;
}

export class MetadataApp implements IMetadataApp {
    constructor(public id?: number, public metadata?: any) {}
}
