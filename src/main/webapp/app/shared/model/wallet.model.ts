import { IUser } from 'app/core/user/user.model';

export interface IWallet {
    id?: number;
    address?: string;
    name?: string;
    private_key?: string;
    public_key?: string;
    public_key_hash?: string;
    wif?: string;
    user?: IUser;
}

export class Wallet implements IWallet {
    constructor(
        public id?: number,
        public address?: string,
        public name?: string,
        public private_key?: string,
        public public_key?: string,
        public public_key_hash?: string,
        public wif?: string,
        public user?: IUser
    ) {}
}
