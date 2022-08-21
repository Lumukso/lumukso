// Import and Network Setup
import {useAccount, useProvider} from "wagmi";
import {useEffect, useState} from "react";

import {ERC725, ERC725JSONSchema} from "@erc725/erc725.js";

// Our static variables
const IPFS_GATEWAY = "https://2eff.lukso.dev/ipfs/";

// Parameters for ERC725 Instance
// import LSP3UniversalProfileMetaDataSchema from "@erc725/erc725.js/schemas/LSP3UniversalProfileMetadata.json";
const schema : ERC725JSONSchema[] = [
    {
        name: 'LSP3Profile',
        key: '0x5ef83ad9559033e6e941db7d7c495acdce616347d28e90c7ce47cbfcfcad3bc5',
        keyType: 'Singleton',
        valueContent: 'JSONURL',
        valueType: 'bytes',
    }
];
const config = { ipfsGateway: IPFS_GATEWAY };

import identicon from 'ethereum-blockies-base64';
import {DecodeDataOutput} from "@erc725/erc725.js/build/main/src/types/decodeData";

/*
 * Fetch the @param's Universal Profile's
 * LSP3 data
 *
 * @param address of Universal Profile
 * @return string JSON or custom error
 */
async function fetchProfileData({address, provider}) {
    try {
        const profile = new ERC725(schema, address, provider, config);
        return await profile.fetchData('LSP3Profile');
    } catch (error) {
        return console.log("This is not an ERC725 Contract: ", error);
    }
}

function getAvatarURL(profileImage) {
    return profileImage.url.replace("ipfs://", IPFS_GATEWAY)
}

function useProfile() {
    const { address, isConnected } = useAccount();

    const [profileData, setProfileData] = useState(null);
    const [name, setName] = useState(null)
    const [image, setImage] = useState(null);

    useEffect(() => {
        if (window.ethereum && isConnected && address) {
            fetchProfileData({address, provider: window.ethereum})
                .then((resp : DecodeDataOutput) => {
                    setProfileData(resp.value);
                    setName((resp.value as any).LSP3Profile.name);

                    const profileImages = (resp.value as any).LSP3Profile.profileImage;
                    setImage(getAvatarURL(profileImages[profileImages.length - 1]));
                })
                .catch(console.error)
        } else {
            setProfileData(null);
        }
    }, [window.ethereum, address])

    useEffect(() => {
        if (address && !image) {
            setImage(identicon(address));
        }
    }, [image]);

    return {
        profileData,
        name,
        image,
    };
}

export {
    useProfile,
}