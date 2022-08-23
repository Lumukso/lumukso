import {configureChains, createClient} from "wagmi";
import {L16_CHAIN_ID, L16_RPC_URL} from "./constants";
import {jsonRpcProvider} from "wagmi/providers/jsonRpc";
import {InjectedConnector} from "wagmi/connectors/injected";

const { chains, provider } = configureChains([
    {
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
], [
    jsonRpcProvider({
        rpc: (chain) => ({
            http: L16_RPC_URL,
        }),
    }),
])

const connector = new InjectedConnector({chains});

const client = createClient({
    autoConnect: true,
    connectors: [
        connector,
    ],
    provider,
})

export {
    chains,
    client,
    connector,
}