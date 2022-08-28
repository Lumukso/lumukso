import {useParams} from "react-router-dom";
import {Layout} from "./Layout";
import {Spinner} from "flowbite-react";
import {ChevronDoubleDownIcon} from "@heroicons/react/outline";
import {useEffect, useState} from "react";
import {loadProfile} from "../hooks/profile";
import {useLumuksoFactory, useSocialRecovery} from "../hooks/lumukso";
import {recoveryProcessId} from "./Recover";
import {useUp} from "../hooks/up";
import {
    LumuksoSocialRecovery__factory
} from '@lumukso/contracts/types/ethers-contracts/factories/LumuksoSocialRecovery__factory';

export function VoteToRecover() {
    const {signer} = useUp();
    let {universalProfileAddress, newOwnerAddress} = useParams();

    const [recoverImage, setRecoverImage] = useState(null);
    const [recoverName, setRecoverName] = useState(null);
    const [newOwnerImage, setNewOwnerImage] = useState(null);
    const [newOwnerName, setNewOwnerName] = useState(null);

    const lumuksoFactory = useLumuksoFactory();
    const [isVoting, setIsVoting] = useState(false);
    function voteToRecover() {
        const _recoveryProcessId = recoveryProcessId({
            profileAddress: universalProfileAddress,
            newOwnerAddress: newOwnerAddress
        });

        setIsVoting(true);
        lumuksoFactory
            .instances(universalProfileAddress)
            .then((lumuksoSocialRecoveryAddress) => {
                return LumuksoSocialRecovery__factory.connect(lumuksoSocialRecoveryAddress, signer)
                    .voteToRecover(_recoveryProcessId, newOwnerAddress, {gasLimit: 1000000})
            })
            .then(tx => tx.wait())
            .finally(() => setIsVoting(false));
    }

    useEffect(() => {
        loadProfile({address: universalProfileAddress})
            .then(({name, image}) => {
                setRecoverImage(image);
                setRecoverName(name);
            });

        loadProfile({address: newOwnerAddress})
            .then(({name, image}) => {
                setNewOwnerImage(image);
                setNewOwnerName(name);
            });
    }, []);

    return (
        <Layout>
            {
                recoverImage && newOwnerImage ?
                    <div className="grid grid-cols-1 justify-center items-center w-full">
                        <div className="flex items-center justify-center mb-6">
                            Please review the following recovery request
                        </div>

                        {
                            recoverImage ?
                                <div className="w-full flex items-center justify-center">
                                    <img className="h-24 w-24 rounded-full shadow-lg" src={recoverImage} />
                                    <div className="ml-3 w-[15rem]">
                                        <h2 className="card-title">{recoverName}</h2>
                                        <h3 className="overflow-hidden text-ellipsis overflow-hidden whitespace-nowrap">{universalProfileAddress}</h3>
                                    </div>
                                </div> : null
                        }

                        <div className="w-full flex items-center justify-center">
                            <ChevronDoubleDownIcon className="h-10" />
                        </div>

                        {
                            newOwnerImage ?
                                <div className="w-full flex items-center justify-center">
                                    <img className="h-24 w-24 rounded-full shadow-lg" src={newOwnerImage} />
                                    <div className="ml-3 w-[15rem]">
                                        <h2 className="card-title">{newOwnerName}</h2>
                                        <h3 className="overflow-hidden text-ellipsis overflow-hidden whitespace-nowrap">{newOwnerAddress}</h3>
                                    </div>
                                </div> : null
                        }

                        <button className="btn btn-primary w-full mt-6"
                                onClick={() => voteToRecover()}
                                disabled={!lumuksoFactory || isVoting}>
                            {isVoting ? <div className="mr-2"><Spinner /></div> : null} Vote to Recover
                        </button>
                    </div> : <Spinner size="lg" />
            }
        </Layout>
    );
}