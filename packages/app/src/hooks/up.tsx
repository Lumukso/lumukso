import {useEffect} from "react";
import {UniversalProfile__factory} from "@lumukso/contracts/types/ethers-contracts/factories/UniversalProfile__factory";
import {ethers} from "ethers";
import {createGlobalState} from 'react-hooks-global-state';

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
        if (window.ethereum) {
            setProvider(new ethers.providers.Web3Provider(window.ethereum));
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
        } else {
            setProvider(null);
            setIsConnecting(false)
        }
    }

    useEffect(() => {
        if (!isConnected) {
            setIsConnecting(true);
            connect();
        }
    }, [isConnected]);

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
            setIsConnecting(true);
            universalProfile.owner().then(setUniversalProfileOwner).finally(() => setIsConnecting(false));
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
