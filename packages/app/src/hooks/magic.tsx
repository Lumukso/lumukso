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

export function useMagic() {
    const [magicIsLoading, setMagicIsLoading] = useState(true);
    const [magicIsLoggedIn, setMagicIsLoggedIn] = useState(false);
    const [magicProvider, setMagicProvider] = useState(null);
    const [magicAddress, setMagicAddress] = useState(null);
    const [magicSigner, setMagicSigner] = useState(null);

    useEffect(() => {
        setMagicIsLoading(true);
        magic.preload()
            .then(() => magic.user.isLoggedIn())
            .then((result) => setMagicIsLoggedIn(result))
            .catch(console.error)
            .finally(() => setMagicIsLoading(false));
    }, []);

    useEffect(() => {
        if (magicIsLoggedIn) {
            setMagicProvider(new ethers.providers.Web3Provider(magic.rpcProvider))
        }
    }, [magicIsLoggedIn]);

    useEffect(() => {
        if (magicProvider) {
            setMagicSigner(magicProvider.getSigner());
            magicProvider.getSigner().getAddress().then(setMagicAddress);
        }
    }, [magicProvider]);

    return {
        magicIsLoading,
        magicIsLoggedIn,
        magicProvider,
        magicAddress,
        magicSigner,
    }
}