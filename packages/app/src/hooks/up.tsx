import {useEffect, useState} from "react";
import {UniversalProfile__factory} from "@lumukso/contracts/types/ethers-contracts/factories/UniversalProfile__factory";
import {UniversalProfile} from "@lumukso/contracts/types/ethers-contracts/UniversalProfile";
import {ethers} from "ethers";
import {useWhatChanged} from "@simbathesailor/use-what-changed";
import { createGlobalState } from 'react-hooks-global-state';
import {ERC725} from "@erc725/erc725.js";
import {createERC725, schema} from "./profile";

const { useGlobalState } = createGlobalState({
    isConnecting: false,
    isConnected: false,
    address: null,
    provider: null,
    signer: null,
    universalProfileOwner: null,
    universalProfile: null,
});

export function useUp() {
    const [isConnecting, setIsConnecting] = useGlobalState('isConnecting');
    const [isConnected, setIsConnected] = useGlobalState('isConnected');
    const [address, setAddress] = useGlobalState('address');
    const [provider, setProvider] = useGlobalState('provider');
    const [signer, setSigner] = useGlobalState('signer');
    const [universalProfileOwner, setUniversalProfileOwner] = useGlobalState('universalProfileOwner');
    const [universalProfile, setUniversalProfile] = useGlobalState('universalProfile');

    function connect() {
        setIsConnecting(true);
    }

    useEffect(() => {
        if (window.ethereum) {
            setProvider(new ethers.providers.Web3Provider(window.ethereum));
        } else {
            setProvider(null);
        }
    }, []);

    useEffect(() => {
        if (provider && isConnecting) {
            window.ethereum.request({
                method: 'eth_requestAccounts',
            }).then(accountsRequest => {
                if (accountsRequest && accountsRequest.length > 0) {
                    setAddress(accountsRequest[0]);
                    setIsConnected(true);
                } else {
                    setIsConnected(false);
                }
            }).finally(() => setIsConnecting(false));
        }
    }, [provider, isConnecting]);

    useEffect(() => {
        if (isConnected && provider && address) {
            setSigner(provider.getSigner(address));
        } else {
            setSigner(null);
        }
    }, [provider, isConnected, address]);

    useEffect(() => {
        if (address && signer) {
            setUniversalProfile(new UniversalProfile__factory(signer).attach(address));
        } else {
            setUniversalProfile(null);
        }
    }, [address, signer]);

    useEffect(() => {
        if (universalProfile) {
            universalProfile.owner().then(setUniversalProfileOwner);
        } else {
            setUniversalProfileOwner(null);
        }
    }, [universalProfile]);

    return {
        address,
        universalProfile,
        universalProfileOwner,
        isConnected,
        isConnecting,
        connect,
        signer,
        provider,
    };
}
