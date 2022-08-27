import {Magic} from 'magic-sdk';
import {useEffect, useState} from "react";
import {L16_CHAIN_ID, L16_RPC_URL} from "../constants";
import {ethers} from "ethers";
import {createGlobalState} from "react-hooks-global-state";

const magic = new Magic(import.meta.env.VITE_MAGIC_KEY, {
    network: {
        rpcUrl: L16_RPC_URL, // Your own node URL
        chainId: L16_CHAIN_ID, // Your own node's chainId
    },
});

const { useGlobalState } = createGlobalState({
    magicIsLoading: true,
    magicIsLoggedIn: false,
    magicProvider: null,
    magicAddress: null,
    magicSigner: null,
});

export function useMagic() {
    const [magicIsLoading, setMagicIsLoading] = useGlobalState('magicIsLoading');
    const [magicIsLoggedIn, setMagicIsLoggedIn] = useGlobalState('magicIsLoggedIn');
    const [magicProvider, setMagicProvider] = useGlobalState('magicProvider');
    const [magicAddress, setMagicAddress] = useGlobalState('magicAddress');
    const [magicSigner, setMagicSigner] = useGlobalState('magicSigner');

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