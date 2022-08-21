import { Magic } from 'magic-sdk';
import {useEffect, useState} from "react";
import {L16_CHAIN_ID, L16_RPC_URL} from "../constants";
const magic = new Magic(import.meta.env.VITE_MAGIC_KEY, {
    network: {
        rpcUrl: L16_RPC_URL, // Your own node URL
        chainId: L16_CHAIN_ID, // Your own node's chainId
    },
});

export function useMagic() {
    const [magicIsLoggedIn, setMagicIsLoggedIn] = useState(false);
    const [magicIsLoggingOut, setMagicIsLoggingOut] = useState(false);

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
    }, []);

    function magicLogout() {
        setMagicIsLoggingOut(true);
    }

    return {
        magicIsLoggedIn,
        magicLogout,
    }
}