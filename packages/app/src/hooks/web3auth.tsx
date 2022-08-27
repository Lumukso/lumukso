import {useEffect} from "react";
import {Web3Auth} from "@web3auth/web3auth";
import {chain} from "../client";
import {L16_EXPLORER_URL} from "../constants";
import {createGlobalState} from "react-hooks-global-state";
import {ethers} from "ethers";

const { useGlobalState } = createGlobalState({
    web3auth: null,
    web3authIsLoading: true,
    web3authIsLoggedIn: false,
    web3authIsConnected: false,
    web3authAddress: "",
    provider: null,
    signer: null,
});

export function useWeb3auth() {
    const [web3auth, setWeb3auth] = useGlobalState('web3auth');
    const [web3authIsLoading, setWeb3authIsLoading] = useGlobalState('web3authIsLoading');
    const [web3authIsLoggedIn, setWeb3authIsLoggedIn] = useGlobalState('web3authIsLoggedIn');
    const [web3authIsConnected, setWeb3authIsConnected] = useGlobalState('web3authIsConnected');
    const [web3authAddress, setWeb3authAddress] = useGlobalState('web3authAddress');
    const [provider, setProvider] = useGlobalState('provider');
    const [signer, setSigner] = useGlobalState('signer');

    const connect = async () => {
        if (!web3auth) {
            console.log("web3auth not initialized yet");
            return;
        }
        const web3authProvider = await web3auth.connect();
        console.log("web3authProvider", web3authProvider);
        const provider = new ethers.providers.Web3Provider(web3authProvider);
        setProvider(provider);
        setSigner(provider.getSigner());
    };

    useEffect(() => {
        const init = async () => {
            try {
                setWeb3authIsLoading(true);
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

                web3auth.addListener("ready", () => {
                    setWeb3authIsLoading(false);
                });

                web3auth.addListener("connected", () => {
                    setWeb3authIsConnected(true);
                });

                setWeb3auth(web3auth);

                await web3auth.initModal();
                if (web3auth.provider) {
                    const provider = new ethers.providers.Web3Provider(web3auth.provider);
                    setProvider(provider);
                    setSigner(provider.getSigner());
                }
            } catch (error) {
                console.error(error);
            } finally {
                setWeb3authIsLoading(false);
            }
        };

        init();
    }, []);

    useEffect(() => {
        if (provider) {
            setWeb3authIsLoading(true);
            provider.send("eth_accounts")
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
            setWeb3authAddress(null);
            setWeb3authIsLoggedIn(false)
        }
    }, [provider])

    return {
        web3auth,
        web3authIsLoading,
        web3authIsLoggedIn,
        web3authIsConnected,
        web3authAddress,
        connect,
        provider,
        signer,
    };
}

