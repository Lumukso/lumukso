import {toast} from "react-toastify";
import {useEffect, useRef, useState} from "react";
import {useSocialRecovery} from "../hooks/lumukso";
import {useProfile} from "../hooks/profile";
import {Spinner} from "flowbite-react";
import {InformationCircleIcon} from "@heroicons/react/outline";
import {useNavigate} from "react-router-dom";
import {useUp} from "../hooks/up";
import {ethers} from "ethers";

export function SetupInvite() {
    const {address: universalProfileAddress} = useUp();
    const {
        lumuksoSocialRecovery,
        isGuardian,
        isPendingGuardian,
    } = useSocialRecovery();

    const navigate = useNavigate();
    const [inviteAddress, setInviteAddress] = useState("");
    const [alreadyGuardian, setAlreadyGuardian] = useState(false);
    const [alreadyPendingGuardian, setAlreadyPendingGuardian] = useState(false);
    const [isGuardianLoading, setIsGuardianLoading] = useState(false);
    const [isInviting, setIsInviting] = useState(false);
    const [self, setSelf] = useState(false);
    const {name: inviteName, image: inviteAvatarUrl, error: inviteError, isLoading: inviteLoading} = useProfile({address: inviteAddress, isConnected: true});

    const notifyInvitationSuccess = () => toast("The user is successfully invited! Now share the confirmation link with him/her to confirm the invitation.", {
        toastId: "notifyInvitationSuccess",
        autoClose: false,
        type: "success"
    });

    const notifyInviteSelf = () => toast("You can't invite yourself.", {
        toastId: "notifyInviteSelf",
        autoClose: 10000,
        type: "error"
    });

    const notifyAlreadyGuardian = () => toast("The user is already a guardian.", {
        toastId: "notifyAlreadyGuardian",
        autoClose: 10000,
        type: "error"
    });

    const notfiyAlreadyPendingGuardian = () => toast("The user is already a pending guardian.", {
        toastId: "notfiyAlreadyPendingGuardian",
        autoClose: 10000,
        type: "error"
    });

    function invite() {
        setIsInviting(true);
        lumuksoSocialRecovery
            .addPendingGuardian(inviteAddress)
            .then(tx => tx.wait())
            .then(() => {
                setInviteAddress("");
                notifyInvitationSuccess();
            })
            .catch(console.error)
            .finally(() => setIsInviting(false));
    }

    useEffect(() => {
        if (inviteAddress.toLowerCase() === universalProfileAddress.toLowerCase()) {
            setSelf(true);
            notifyInviteSelf();
        } else {
            setSelf(false);
        }
    }, [inviteAddress, universalProfileAddress]);

    useEffect(() => {
        if (inviteAddress && !inviteLoading && !inviteError && !self) {
            setIsGuardianLoading(true);
            Promise.all([
                isGuardian(inviteAddress).then(setAlreadyGuardian).catch(console.error),
                isPendingGuardian(inviteAddress).then(setAlreadyPendingGuardian).catch(console.error)
            ]).finally(() => setIsGuardianLoading(false));
        } else {
            setIsGuardianLoading(false);
        }
    }, [inviteAddress, inviteLoading, inviteError, self]);

    useEffect(() => {
        if (alreadyGuardian) {
            notifyAlreadyGuardian();
        }
    }, [alreadyGuardian]);

    useEffect(() => {
        if (alreadyPendingGuardian) {
            notfiyAlreadyPendingGuardian();
        }
    }, [alreadyPendingGuardian]);

    const newRecoverySecretRef : any = useRef();
    const [isSettingSecret, setIsSettingSecret] = useState(false);
    function setSecret(newSecret : string) {
        if (newRecoverySecretRef.current) {
            newRecoverySecretRef.current.value = "";
        }

        if (!isSettingSecret) {
            setIsSettingSecret(true);
            const newSecretHash = ethers.utils.solidityKeccak256(["string"], [newSecret])
            lumuksoSocialRecovery
                .setSecret(newSecretHash)
                .then(tx => tx.wait())
                .catch(console.error)
                .finally(() => setIsSettingSecret(false));
        }
    }

    return (
        <div className="mt-6">
            <div className="p-3 flex">
                <InformationCircleIcon className="w-6 h-6 pr-1" />
                <strong>Invite an universal profile user to become your guardian</strong>
            </div>

            {
                inviteAvatarUrl ?
                    <div className="card w-96 mt-6">
                        <figure>
                            {
                                (inviteLoading || isGuardianLoading) ? <Spinner size="lg" />
                                    : <img
                                        className="h-24 w-24 rounded-full shadow-lg"
                                        src={inviteAvatarUrl}
                                    />
                            }
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">{inviteName}</h2>
                            <div className="card-actions">
                                <button className="btn btn-primary"
                                        disabled={inviteError || inviteLoading || self || isGuardianLoading || alreadyGuardian || alreadyPendingGuardian || isInviting}
                                        onClick={() => invite()}>
                                    {
                                        isInviting ?
                                            <div className="mr-3">
                                                <Spinner
                                                    size="sm"
                                                    light={true}
                                                />
                                            </div> : null
                                    }
                                    Invite as guardian
                                </button>
                            </div>
                        </div>
                    </div> : null
            }


            <div className="form-control w-full">
                <input type="text"
                       placeholder="Universal profile address"
                       pattern="0x[0-9a-fA-F]{40}"
                       className="input input-bordered w-full"
                       disabled={inviteLoading}
                       onChange={(e) => setInviteAddress(e.currentTarget.value)} />
            </div>

            <div className="divider" />

            <button className="btn w-full" onClick={() => navigate('/pending')}>
                See Pending Invitations
            </button>

            <a href="#set-secret-modal">
                <button className="btn w-full mt-2"
                        disabled={isSettingSecret}>
                    {
                        isSettingSecret ?
                            <div className="mr-2">
                                <Spinner />
                            </div> : null
                    }
                    Set Recovery Secret
                </button>
            </a>

            <div className="modal" id="set-secret-modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Set recovery secret</h3>
                    <p className="py-4">
                        <input type="password"
                               className="input input-bordered w-full"
                               placeholder="Your recovery secret"
                               ref={newRecoverySecretRef} />
                    </p>
                    <div className="modal-action">
                        <a href="#" className="btn" onClick={() => setSecret(newRecoverySecretRef.current.value)}>Submit</a>
                    </div>
                </div>
            </div>
        </div>
    );
}