import { Extension } from '@magic-sdk/commons';

export enum LuksoPayloadMethod {
    LuksoSignTransaction = 'eth_sendTransaction',
}

export interface LuksoConfig {
    rpcUrl: string;
    chainId: string;
}

export class LuksoExtension extends Extension.Internal<'lukso', any> {
    name = 'lukso' as const;
    config: any = {};

    constructor(public luksoConfig: LuksoConfig) {
        super();

        this.config = {
            rpcUrl: luksoConfig.rpcUrl,
            chainType: 'L16',
            options: {
                chainId: luksoConfig.chainId,
            },
        };
    }

    public async sendTransaction(params: any) {
        return this.request(this.utils.createJsonRpcRequestPayload(LuksoPayloadMethod.LuksoSignTransaction, params));
    }
}