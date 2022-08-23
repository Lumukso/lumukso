import {useEffect, useState} from "react";
import {UniversalProfile__factory} from "@lumukso/contracts/types/ethers-contracts/factories/UniversalProfile__factory";
import {UniversalProfile} from "@lumukso/contracts/types/ethers-contracts/UniversalProfile";
import {ethers} from "ethers";

export function useUp() {
    const [isConnecting, setIsConnecting] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [address, setAddress] = useState(null);
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [universalProfileOwner, setUniversalProfileOwner] = useState(null);
    const [universalProfile, setUniversalProfile] : [UniversalProfile, any] = useState(null);

    function connect() {
        setIsConnecting(true);
    }

    useEffect(() => {
        if (window.ethereum) {
            setProvider(new ethers.providers.Web3Provider(window.ethereum));
        } else {
            setProvider(null);
        }
    }, [window.ethereum]);

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
