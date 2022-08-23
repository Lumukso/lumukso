import {useEffect, useState} from "react";
import {Web3Auth} from "@web3auth/web3auth";
import {CHAIN_NAMESPACES, SafeEventEmitterProvider} from "@web3auth/base";
import {L16_CHAIN_ID, L16_RPC_URL} from "../constants";

const clientId = import.meta.env.VITE_WEB3AUTH_KEY;

function useWeb3auth() {
    const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
    const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null);

    useEffect(() => {
        const init = async () => {
            try {

                const web3auth = new Web3Auth({
                    clientId,
                    chainConfig: {
                        chainNamespace: CHAIN_NAMESPACES.EIP155,
                        chainId: "0x" + L16_CHAIN_ID.toString(16),
                        rpcTarget: L16_RPC_URL,
                    },
                    authMode: 'WALLET',
                });

                setWeb3auth(web3auth);

                await web3auth.initModal();
                if (web3auth.provider) {
                    setProvider(web3auth.provider);
                };
            } catch (error) {
                console.error(error);
            }
        };

        init();
    }, []);

    const login = async () => {
        if (!web3auth) {
            console.log("web3auth not initialized yet");
            return;
        }
        const web3authProvider = await web3auth.connect();
        setProvider(web3authProvider);
    };

    const logout = async () => {
        if (!web3auth) {
            console.log("web3auth not initialized yet");
            return;
        }
        await web3auth.logout();
        setProvider(null);
    };

    return {
        web3auth,
        login,
        logout,
    };
}

export {
    useWeb3auth,
}