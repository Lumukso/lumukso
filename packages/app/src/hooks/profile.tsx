// Import and Network Setup
import {useEffect, useState} from "react";

import {ERC725, ERC725JSONSchema} from "@erc725/erc725.js";
import identicon from 'ethereum-blockies-base64';
import {DecodeDataOutput} from "@erc725/erc725.js/build/main/src/types/decodeData";
// Parameters for ERC725 Instance
import LSP3UniversalProfileMetaDataSchema from "@erc725/erc725.js/schemas/LSP3UniversalProfileMetadata.json";
import {toast} from "react-toastify";

// Our static variables
export const IPFS_GATEWAY = "https://2eff.lukso.dev/ipfs/";

export function createERC725(address) : ERC725 {
    return new ERC725(LSP3UniversalProfileMetaDataSchema as ERC725JSONSchema[], address, window.ethereum, {ipfsGateway: IPFS_GATEWAY});
}

export function loadProfile({address}) {
    const profile = createERC725(address);
    return profile.fetchData('LSP3Profile')
        .then((resp: DecodeDataOutput) => {
            let image;
            const profileImages = (resp.value as any).LSP3Profile.profileImage;
            if (profileImages && profileImages.length) {
                image = profileImages[profileImages.length - 1].url.replace("ipfs://", IPFS_GATEWAY);
            }

            return Promise.resolve({
                address,
                profileData: resp.value,
                name: (resp.value as any).LSP3Profile.name + "#" + address.substring(2, 6),
                image
            });
        })
}

export function useProfile({address, isConnected}) {
    const [profileData, setProfileData] = useState(null);
    const [name, setName] = useState(null)
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const notifyInvalidProfile = () => toast("The address isn't an valid Universal Profile.", {
        toastId: "notifyInvalidProfile",
        autoClose: 10000,
        type: "error"
    });

    useEffect(() => {
        if (isConnected && address) {
            setIsLoading(true);
            loadProfile({address})
                .then(({profileData, name, image}) => {
                    setProfileData(profileData);
                    setName(name);
                    setImage(image);
                })
                .then(() => {
                    setError(null);
                })
                .catch((e) => {
                    console.error(e);
                    setError(e);
                    setImage(null);
                    setName(null);
                    setProfileData(null);
                })
                .finally(() => setIsLoading(false))
        } else {
            setImage(null);
            setName(null);
            setProfileData(null);
        }
    }, [isConnected, address])

    useEffect(() => {
        if (address && !image && !error && !isLoading) {
            setImage(identicon(address));
        }
    }, [image, address, error, isLoading]);

    useEffect(() => {
        if (error) {
            notifyInvalidProfile();
        }
    }, [error]);

    return {
        address,
        profileData,
        name,
        image,
        error,
        isLoading,
    };
}
