import {Magic} from 'magic-sdk';
import {useEffect} from "react";
import {L16_CHAIN_ID, L16_RPC_URL} from "../constants";
import {ethers} from "ethers";
import {createGlobalState} from "react-hooks-global-state";
import {LuksoExtension} from "../magic/LuksoExtension";

const magic = new Magic(import.meta.env.VITE_MAGIC_KEY, {
    network: {
        rpcUrl: L16_RPC_URL,
        chainId: L16_CHAIN_ID,
    },
    extensions: [
        new LuksoExtension({
            rpcUrl: L16_RPC_URL,
            chainId: ethers.utils.hexlify(L16_CHAIN_ID),
        }),
    ]
});

const { useGlobalState } = createGlobalState({
    magicIsLoading: true,
    magicIsLoggedIn: false,
    magicProvider: null,
    magicAddress: null,
    magicSigner: null,
});

let preloaded = false;

export function useMagic() {
    const [magicIsLoading, setMagicIsLoading] = useGlobalState('magicIsLoading');
    const [magicIsLoggedIn, setMagicIsLoggedIn] = useGlobalState('magicIsLoggedIn');
    const [magicProvider, setMagicProvider] = useGlobalState('magicProvider');
    const [magicAddress, setMagicAddress] = useGlobalState('magicAddress');
    const [magicSigner, setMagicSigner] = useGlobalState('magicSigner');

    useEffect(() => {
        if (!preloaded) {
            preloaded = true;
            setMagicIsLoading(true);
            magic.preload()
                .then(() => magic.user.isLoggedIn())
                .then((result) => setMagicIsLoggedIn(result))
                .catch(console.error)
                .finally(() => setMagicIsLoading(false));
        }
    }, []);

    useEffect(() => {
        if (magicIsLoggedIn) {
            setMagicProvider(new ethers.providers.Web3Provider(magic.rpcProvider, {
                name: "L16",
                chainId: L16_CHAIN_ID,
            }))
        }
    }, [magicIsLoggedIn]);

    useEffect(() => {
        if (magicProvider) {
            setMagicSigner(magicProvider.getSigner());
            magicProvider.getSigner().getAddress().then(setMagicAddress);
        }
    }, [magicProvider]);

    return {
        magic,
        magicIsLoading,
        magicIsLoggedIn,
        magicProvider,
        magicAddress,
        magicSigner,
    }
}