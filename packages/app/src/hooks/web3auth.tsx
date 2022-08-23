import {useEffect, useState} from "react";
import {Web3Auth} from "@web3auth/web3auth";
import {chain} from "../client";
import {L16_EXPLORER_URL} from "../constants";

export function useWeb3auth() {
    const [ready, setReady] = useState(false);
    const [web3auth, setWeb3auth] = useState(null);
    const [web3authIsLoading, setWeb3authIsLoading] = useState(false);
    const [web3authIsLoggedIn, setWeb3authIsLoggedIn] = useState(false);
    const [web3authAddress, setWeb3authAddress] = useState(null);
    const [provider, setProvider] = useState(null);

    const connect = async () => {
        if (!web3auth) {
            console.log("web3auth not initialized yet");
            return;
        }
        const web3authProvider = await web3auth.connect();
        console.log("web3authProvider", web3authProvider);
        setProvider(web3authProvider);
    };

    useEffect(() => {
        const init = async () => {
            try {
                const web3auth = new Web3Auth({
                    clientId: import.meta.env.VITE_WEB3AUTH_KEY,
                    authMode: "DAPP",
                    chainConfig: {
                        chainNamespace: 'eip155',
                        chainId: `0x${chain.id.toString(16)}`,
                        rpcTarget: chain.rpcUrls.default,
                        displayName: chain.name,
                        ticker: chain.nativeCurrency.symbol,
                        tickerName: chain.nativeCurrency.name,
                        blockExplorer: L16_EXPLORER_URL,
                    },
                    enableLogging: false,
                });

                setWeb3auth(web3auth);

                await web3auth.initModal();
                if (web3auth.provider) {
                    console.log(web3auth.provider);
                    setProvider(web3auth.provider);
                    setReady(true);
                }
            } catch (error) {
                console.error(error);
            }
        };

        init();
    }, []);

    useEffect(() => {
        if (ready && provider) {
            setWeb3authIsLoading(true);
            provider.request({method: "eth_accounts"})
                .then((accounts) => {
                    if (accounts && accounts.length) {
                        setWeb3authAddress(accounts[0]);
                    } else {
                        console.error("failed to load web3auth address")
                    }
                })
                .then(() => setWeb3authIsLoggedIn(true))
                .catch(console.error)
                .finally(() => setWeb3authIsLoading(false));
        } else {
            setWeb3authIsLoading(false);
            setWeb3authAddress(null);
            setWeb3authIsLoggedIn(false)
        }
    }, [ready, provider])

    return {
        web3auth,
        web3authIsLoading,
        web3authIsLoggedIn,
        web3authAddress,
        connect,
    };
}

