import {receipts} from '@lumukso/contracts/broadcast/deploy.s.sol/2828/run-latest.json';

export const L16_CHAIN_ID = 2828;
export const L16_RPC_URL = "https://rpc.l16.lukso.network";
export const L16_EXPLORER_URL = "https://explorer.execution.l16.lukso.network/";
export const L16_LUMUKSO_FACTORY_ADDRESS = receipts[0].contractAddress;
export const L16_LUMUKSO_UTILS_ADDRESS = receipts[1].contractAddress;