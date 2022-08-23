import {Magic} from 'magic-sdk';
import {useEffect, useState} from "react";
import {L16_CHAIN_ID, L16_RPC_URL} from "../constants";
import {ethers} from "ethers";

const magic = new Magic(import.meta.env.VITE_MAGIC_KEY, {
    network: {
        rpcUrl: L16_RPC_URL, // Your own node URL
        chainId: L16_CHAIN_ID, // Your own node's chainId
    },
});
const provider = new ethers.providers.Web3Provider(magic.rpcProvider);

export function useMagic() {
    const [magicIsLoggedIn, setMagicIsLoggedIn] = useState(false);
    const [magicIsLoggingOut, setMagicIsLoggingOut] = useState(false);
    const [magicAddress, setMagicAddress] = useState(null);
    const [magicSigner, setMagicSigner] = useState(null);

    useEffect(() => {
        magic.user.isLoggedIn().then(setMagicIsLoggedIn).catch(console.error);

        if (magicIsLoggingOut) {
            magic.user.logout().then((done) => {
                if (done) {
                    setMagicIsLoggedIn(false);
                }
            }).catch(console.error).finally(() => {
                setMagicIsLoggingOut(false);
            });
        }
    }, [magicIsLoggingOut]);

    useEffect(() => {
        if (magicIsLoggedIn) {
            setMagicSigner(provider.getSigner());
            provider.getSigner().getAddress().then(setMagicAddress);
        }
    }, [magicIsLoggedIn]);

    function magicLogout() {
        setMagicIsLoggingOut(true);
    }

    return {
        magicIsLoggedIn,
        magicLogout,
        magicProvider: provider,
        magicAddress,
        magicSigner,
    }
}