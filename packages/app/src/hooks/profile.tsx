// Import and Network Setup
import {useEffect, useState} from "react";

import {ERC725, ERC725JSONSchema} from "@erc725/erc725.js";
import identicon from 'ethereum-blockies-base64';
import {DecodeDataOutput} from "@erc725/erc725.js/build/main/src/types/decodeData";
import {useUp} from "./up";
// Parameters for ERC725 Instance
import LSP3UniversalProfileMetaDataSchema from "@erc725/erc725.js/schemas/LSP3UniversalProfileMetadata.json";

// Our static variables
export const IPFS_GATEWAY = "https://2eff.lukso.dev/ipfs/";

export function createERC725(address) : ERC725 {
    return new ERC725(LSP3UniversalProfileMetaDataSchema as ERC725JSONSchema[], address, window.ethereum, {ipfsGateway: IPFS_GATEWAY});
}

export function useProfile() {
    const {address, isConnected} = useUp();
    const [profileData, setProfileData] = useState(null);
    const [name, setName] = useState(null)
    const [image, setImage] = useState(null);

    useEffect(() => {
        if (isConnected && address) {
            const profile = createERC725(address);
            profile.fetchData('LSP3Profile')
                .then((resp: DecodeDataOutput) => {
                    setProfileData(resp.value);
                    setName((resp.value as any).LSP3Profile.name + "#" + address.substring(2, 6));

                    const profileImages = (resp.value as any).LSP3Profile.profileImage;
                    if (profileImages && profileImages.length) {
                        setImage(profileImages[profileImages.length - 1].url.replace("ipfs://", IPFS_GATEWAY));
                    }
                })
                .catch(console.error)
        } else {
            setProfileData(null);
        }
    }, [isConnected, address])

    useEffect(() => {
        if (address && !image) {
            setImage(identicon(address));
        }
    }, [image, address]);

    return {
        address,
        profileData,
        name,
        image,
    };
}
