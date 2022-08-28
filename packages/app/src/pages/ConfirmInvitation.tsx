import {useParams} from "react-router-dom";
import {Layout} from "./Layout";
import {useLumuksoFactory} from "../hooks/lumukso";
import {useEffect, useState} from "react";
import {UniversalProfile__factory} from '@lumukso/contracts/types/ethers-contracts/factories/UniversalProfile__factory';
import {
    LumuksoSocialRecovery__factory
} from '@lumukso/contracts/types/ethers-contracts/factories/LumuksoSocialRecovery__factory';
import {useUp} from "../hooks/up";
import {ethers} from "ethers";
import {toast} from "react-toastify";
import {Spinner} from "flowbite-react";
import {useProfile} from "../hooks/profile";

export function ConfirmInvitation() {
    const {signer, provider, address: upAddress} = useUp();
    const {universalProfileAddress, pendingGuardianAddress} = useParams();
    const lumuksoFactory = useLumuksoFactory();

    const [universalProfile, setUniversalProfile] = useState(null);
    const [socialRecovery, setSocialRecovery] = useState(null);
    const [isSocialRecoveryLoading, setIsSocialRecoveryLoading] = useState(false);
    const [socialRecoveryNotExists, setSocialRecoveryNotExists] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [alreadyGuardian, setAlreadyGuardian] = useState(false);
    const [isGuardianLoading, setIsGuardianLoading] = useState(false);
    const [isPendingGuardian, setIsPendingGuardian] = useState(false);

    const notifySocialRecoveryNotExists = () => toast("Social recovery contract not found", {
        toastId: "notifySocialRecoveryNotExists",
        autoClose: false,
        type: "error"
    });

    const notifyUnauthorized = () => toast("You are not authorized to confirm this invitation.", {
        toastId: "notifyUnauthorized",
        autoClose: false,
        type: "error"
    });

    const notifyConfirmed = () => toast("Invitation successfully confirmed.", {
        toastId: "notifyConfirmed",
        autoClose: 10000,
        type: "success"
    });

    const notifyAlreadyGuardian = () => toast("You are already a guardian.", {
        toastId: "notifyAlreadyGuardian",
        autoClose: false,
        type: "error"
    });

    const [isConfirmed, setIsConfirmed] = useState(false);
    function confirm() {
        if (isConfirming || !socialRecovery || !signer) return;

        setIsConfirming(true);
        console.log(socialRecovery);
        socialRecovery
            .getConfirmationMessage(upAddress.toString())
            .then((message) => {
                return window.ethereum.request({
                    method: 'eth_sign',
                    params: [upAddress, message],
                });
            })
            .then(({signature}) => {
                return socialRecovery.confirmPendingGuardian(
                    signer.getAddress(),
                    signature,
                );
            })
            .then(tx => tx.wait())
            .then(() => notifyConfirmed())
            .then(() => setIsConfirmed(true))
            .catch(console.error)
            .finally(() => setIsConfirming(false));
    }

    useEffect(() => {
        if (upAddress && pendingGuardianAddress) {
            if (upAddress.toLowerCase() !== pendingGuardianAddress.toLowerCase()) {
                notifyUnauthorized();
            } else {
                setIsAuthorized(true);
            }
        }
    }, [upAddress, pendingGuardianAddress]);

    useEffect(() => {
        if (universalProfileAddress) {
            setUniversalProfile(UniversalProfile__factory.connect(universalProfileAddress, signer));
        }
    }, [universalProfileAddress]);

    useEffect(() => {
        if (socialRecovery && !isGuardianLoading && !alreadyGuardian) {
            setIsGuardianLoading(true);
            socialRecovery.isGuardian(upAddress.toString())
                .then(isGuardian => setAlreadyGuardian(isGuardian))
                .finally(() => setIsGuardianLoading(false))
        }
    }, [socialRecovery, isGuardianLoading, alreadyGuardian]);

    useEffect(() => {
        if (alreadyGuardian && !isConfirmed && !isConfirming) {
            notifyAlreadyGuardian();
        }
    }, [alreadyGuardian, isConfirmed, isConfirming]);

    useEffect(() => {
        if (lumuksoFactory && universalProfile && !isSocialRecoveryLoading && signer && !socialRecovery) {
            setIsSocialRecoveryLoading(true);
            lumuksoFactory
                .instances(universalProfile.address)
                .then(socialRecoveryAddress => {
                    if (socialRecoveryAddress !== ethers.constants.AddressZero) {
                        setSocialRecovery(LumuksoSocialRecovery__factory.connect(socialRecoveryAddress.toString(), signer));
                    } else {
                        setSocialRecoveryNotExists(true);
                    }
                })
                .catch(console.error)
                .finally(() => setIsSocialRecoveryLoading(false))
        }
    }, [lumuksoFactory, universalProfile, isSocialRecoveryLoading, signer, socialRecovery]);

    useEffect(() => {
        if (socialRecoveryNotExists) {
            notifySocialRecoveryNotExists();
        }
    }, [socialRecoveryNotExists]);

    const {
        name: inviteName,
        image: inviteAvatarUrl,
        error: inviteError,
        isLoading: inviteLoading
    } = useProfile({address: universalProfileAddress, isConnected: true});

    return (
        <Layout>
            {
                inviteAvatarUrl ?
                    <div className="card w-96 mt-6">
                        <figure>
                            {
                                (inviteLoading) ? <Spinner size="lg"/>
                                    : <img
                                        className="h-24 w-24 rounded-full shadow-lg"
                                        src={inviteAvatarUrl}
                                    />
                            }
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">{inviteName}</h2>
                            <h3>You are invited to become a social recovery guardian of {inviteName}</h3>
                            <div className="card-actions">
                                <button className="btn btn-primary"
                                        disabled={inviteError || inviteLoading || isConfirming || !signer || !socialRecovery || !isAuthorized || alreadyGuardian}
                                        onClick={() => confirm()}>
                                    {
                                        isConfirming ?
                                            <div className="mr-3">
                                                <Spinner
                                                    size="sm"
                                                    light={true}
                                                />
                                            </div> : null
                                    }
                                    Confirm Invitation
                                </button>
                            </div>
                        </div>
                    </div> : null
            }
        </Layout>
    );
}