import * as React from 'react'
import * as ReactDOM from 'react-dom/client'

import {
    WagmiConfig,
    configureChains,
    createClient,
} from 'wagmi'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { InjectedConnector } from 'wagmi/connectors/injected'

import { App } from './App'
import Context from './LumuksoContext'

const { chains, provider, webSocketProvider } = configureChains([
    {
        id: 2828,
        name: "Lukso L16 Public Testnet",
        network: "L16",
        nativeCurrency: {
            name: "LYXt",
            symbol: "LYXt",
            decimals: 18,
        },
        rpcUrls: {
            default: "wss://ws.rpc.l16.lukso.network",
        }
    }
], [
    jsonRpcProvider({
        rpc: (chain) => ({
            http: "https://rpc.l16.lukso.network",
            webSocket: "wss://ws.rpc.l16.lukso.network"
        }),
    }),
])

const client = createClient({
    autoConnect: true,
    connectors: [
        new InjectedConnector({
            chains,
            options: {
                name: 'Injected',
                shimDisconnect: true,
            },
        }),
    ],
    provider,
    webSocketProvider,
})

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <WagmiConfig client={client}>
            <Context.Provider value={{}}>
                <App />
            </Context.Provider>
        </WagmiConfig>
    </React.StrictMode>,
)