import {L16_CHAIN_ID, L16_RPC_URL} from "./constants";

const chain = {
    id: L16_CHAIN_ID,
    name: "Lukso L16 Public Testnet",
    network: "L16",
    nativeCurrency: {
        name: "LYXt",
        symbol: "LYXt",
        decimals: 18,
    },
    rpcUrls: {
        default: L16_RPC_URL,
    }
}

export {
    chain,
}