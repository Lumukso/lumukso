import {Layout} from "./Layout";
import {useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {ethers} from "ethers";
import {toast, ToastContainer} from "react-toastify";
import {useLumuksoFactory, useLumuksoUtils} from "../hooks/lumukso";
import {
    LumuksoSocialRecovery__factory
} from "@lumukso/contracts/types/ethers-contracts/factories/LumuksoSocialRecovery__factory";
import {useUp} from "../hooks/up";
import {useProfile} from "../hooks/profile";
import {Spinner} from "flowbite-react";
import useWebShare from "react-use-web-share";
import {SetupConnect} from "../components/SetupConnect";
import {useMagic} from "../hooks/magic";
import {useWeb3auth} from "../hooks/web3auth";
import {Simulate} from "react-dom/test-utils";
import input = Simulate.input;
import {UserIcon} from "@heroicons/react/solid";

export function recoveryProcessId({profileAddress, newOwnerAddress}) {
    return ethers.utils.hashMessage(`${profileAddress.toString().toLowerCase()}:${newOwnerAddress.toString().toLowerCase()}`);
}

export function Recover() {
    const lumuksoFactory = useLumuksoFactory();
    const lumuksoUtils = useLumuksoUtils();
    const {share} = useWebShare();
    const {
        signer,
        address: upAddress,
    } = useUp();
    let {universalProfileAddress} = useParams();
    const [inputUniversalProfileAddress, setInputUniversalProfileAddress] = useState("");
    const [universalProfileAddressIsValid, setUniversalProfileAddressIsValid] = useState(false);
    const [lumuksoSocialRecovery, setLumuksoSocialRecovery] = useState(null);
    const [isSocialRecoveryLoading, setIsSocialRecoveryLoading] = useState(false);
    const [nonRecoverableUniversalProfileAddress, setNonRecoverableUniversalProfileAddress] = useState(false);
    const [isRecovering, setIsRecovering] = useState(false);
    const [isRecovered, setIsRecovered] = useState(false);
    const addressInputRef = useRef(null);
    const {
        image: recoverImage,
        name: recoverName,
        error: recoverError,
        isLoading: recoverLoading
    } = useProfile({address: inputUniversalProfileAddress, isConnected: true});

    useEffect(() => {
        addressInputRef.current.focus();
    }, []);

    useEffect(() => {
        if (universalProfileAddress) {
            setInputUniversalProfileAddress(universalProfileAddress);
        }
    }, [universalProfileAddress]);

    useEffect(() => {
        if (inputUniversalProfileAddress) {
            if (!ethers.utils.isAddress(inputUniversalProfileAddress)) {
                addressInputRef.current.reportValidity();
                setUniversalProfileAddressIsValid(false);
            } else {
                setUniversalProfileAddressIsValid(true);
            }
        }
    }, [inputUniversalProfileAddress])

    useEffect(() => {
        if (lumuksoFactory && universalProfileAddressIsValid && signer && !isSocialRecoveryLoading && inputUniversalProfileAddress) {
            setIsSocialRecoveryLoading(true);
            lumuksoFactory.instances(inputUniversalProfileAddress)
                .then((lumuksoAddress: string | ethers.ContractTransaction) => {
                    if (lumuksoAddress !== ethers.constants.AddressZero) {
                        setLumuksoSocialRecovery(LumuksoSocialRecovery__factory.connect(lumuksoAddress.toString(), signer));
                        setNonRecoverableUniversalProfileAddress(false);
                    } else {
                        setNonRecoverableUniversalProfileAddress(true);
                    }
                })
                .catch(console.error)
                .finally(() => setIsSocialRecoveryLoading(false));
        }
    }, [lumuksoFactory, universalProfileAddressIsValid, signer, inputUniversalProfileAddress])

    const notifyNonRecoverableUniversalProfileAddress = () => toast("The universal profile address is not recoverable", {
        toastId: "notifyNonRecoverableUniversalProfileAddress",
        autoClose: false,
        type: 'error',
    });
    useEffect(() => {
        if (nonRecoverableUniversalProfileAddress) {
            notifyNonRecoverableUniversalProfileAddress();
        }
    }, [nonRecoverableUniversalProfileAddress]);

    const [isLoadingGuardianThreshold, setIsLoadingGuardianThreshold] = useState(false);
    const [guardianThreshold, setGuardianThreshold] = useState(null);
    useEffect(() => {
        if (lumuksoSocialRecovery && !isLoadingGuardianThreshold && !guardianThreshold) {
            let _guardianThreshold = 0;
            setIsLoadingGuardianThreshold(true);
            lumuksoSocialRecovery
                .getGuardiansThreshold()
                .then((threshold: ethers.BigNumber) => {
                    setGuardianThreshold(_guardianThreshold = threshold.toNumber());
                })
                .catch(console.error)
                .finally(() => setIsLoadingGuardianThreshold(false));
        }
    }, [lumuksoSocialRecovery, isLoadingGuardianThreshold, guardianThreshold]);

    const [checkingProfileAccess, setCheckingProfileAccess] = useState(false);
    useEffect(() => {
        if (lumuksoUtils && !isRecovered && !checkingProfileAccess && inputUniversalProfileAddress && upAddress) {
            setCheckingProfileAccess(true);
            lumuksoUtils
                .checkProfileAccessRecovered(inputUniversalProfileAddress, upAddress)
                .then((_isRecovered) => setIsRecovered(_isRecovered))
                .finally(() => setCheckingProfileAccess(false));
        }
    }, [lumuksoUtils, isRecovered, checkingProfileAccess, inputUniversalProfileAddress, upAddress]);

    const {magicAddress, magicSigner, magic} = useMagic();
    const [loadingMagicAddressIsGuardian, setLoadingMagicAddressIsGuardian] = useState(false);
    const [loadedMagicAddressIsGuardian, setLoadedMagicAddressIsGuardian] = useState(false);
    const [magicAddressIsGuardian, setMagicAddressIsGuardian] = useState(false);
    useEffect(() => {
        if (lumuksoSocialRecovery && magicAddress && !loadingMagicAddressIsGuardian && !magicAddressIsGuardian) {
            setLoadingMagicAddressIsGuardian(true);
            lumuksoSocialRecovery
                .isGuardian(magicAddress)
                .then((isGuardian) => {
                    setMagicAddressIsGuardian(isGuardian);
                    setLoadedMagicAddressIsGuardian(true);
                })
                .catch(console.error)
                .finally(() => setLoadingMagicAddressIsGuardian(false))
        }
    },[lumuksoSocialRecovery, magicAddress, loadingMagicAddressIsGuardian, magicAddressIsGuardian]);
    const notifyMagicAddressIsNotGuardian = () => toast("The magic address is not a guardian", {
        toastId: "notifyMagicAddressIsNotGuardian",
        autoClose: false,
        type: 'error',
    });
    const [isVotingMagic, setIsVotingMagic] = useState(false);
    useEffect(() => {
        if (magicAddress && loadedMagicAddressIsGuardian && !magicAddressIsGuardian) {
            notifyMagicAddressIsNotGuardian();
        }
    }, [magicAddress, loadedMagicAddressIsGuardian, magicAddressIsGuardian]);
    const [isMagicVoted, setIsMagicVoted] = useState(false);
    useEffect(() => {
        if (magicSigner && !loadingMagicAddressIsGuardian && inputUniversalProfileAddress && upAddress && !isRecovered) {
            if (!isVotingMagic && !isMagicVoted && magicAddressIsGuardian) {
                setIsVotingMagic(true)
                const _recoveryProcessId = recoveryProcessId({profileAddress: inputUniversalProfileAddress, newOwnerAddress: upAddress});
                console.log("Recovery process id: ", _recoveryProcessId);
                lumuksoSocialRecovery
                    .getGuardianVote(_recoveryProcessId, magicAddress)
                    .then(votedAddress => {
                        if (votedAddress.toLowerCase() !== upAddress.toLowerCase()) {
                            return lumuksoSocialRecovery
                                .getVoteToRecoverMessage(_recoveryProcessId, upAddress)
                                .then(voteToRecoverMessage => magicSigner.signMessage(voteToRecoverMessage))
                                .then(signature => lumuksoSocialRecovery.voteToRecoverViaSignature(magicAddress, _recoveryProcessId, upAddress, signature, {gasLimit: 1000000}))
                                .then(tx => tx.wait())
                                .then(() => setIsMagicVoted(true));
                        } else {
                            setIsMagicVoted(true)
                        }
                    })
                    .catch(console.error)
                    .finally(() => setIsVotingMagic(false));
            }
        }
    }, [magicAddress, magicSigner, loadingMagicAddressIsGuardian, isVotingMagic, inputUniversalProfileAddress, upAddress, isMagicVoted, isRecovered]);

    const {web3authAddress, signer: web3authSigner} = useWeb3auth();
    const [loadingWeb3authAddressIsGuardian, setLoadingWeb3authAddressIsGuardian] = useState(false);
    const [loadedWeb3authAddressIsGuardian, setLoadedWeb3authAddressIsGuardian] = useState(false);
    const [web3authAddressIsGuardian, setWeb3authAddressIsGuardian] = useState(false);
    useEffect(() => {
        if (lumuksoSocialRecovery && web3authAddress && !loadingWeb3authAddressIsGuardian && !web3authAddressIsGuardian) {
            setLoadingWeb3authAddressIsGuardian(true);
            lumuksoSocialRecovery
                .isGuardian(web3authAddress)
                .then((isGuardian) => {
                    setWeb3authAddressIsGuardian(isGuardian);
                    setLoadedWeb3authAddressIsGuardian(true);
                }).catch(console.error)
                .finally(() => setLoadingWeb3authAddressIsGuardian(false));
        }
    }, [lumuksoSocialRecovery, web3authAddress, loadingWeb3authAddressIsGuardian, web3authAddressIsGuardian]);
    const notifyWeb3authAddressIsNotGuardian = () => toast("The web3auth address is not a guardian", {
        toastId: "notifyWeb3authAddressIsNotGuardian",
        autoClose: false,
        type: 'error',
    });
    const [isVotingWeb3auth, setIsVotingWeb3auth] = useState(false);
    useEffect(() => {
        if (web3authAddress && loadedWeb3authAddressIsGuardian && !web3authAddressIsGuardian) {
            notifyWeb3authAddressIsNotGuardian();
        }
    }, [web3authAddress, loadedWeb3authAddressIsGuardian, web3authAddressIsGuardian]);
    const [isWeb3authVoted, setIsWeb3authVoted] = useState(false);
    useEffect(() => {
        if (web3authSigner && !loadingWeb3authAddressIsGuardian && inputUniversalProfileAddress && upAddress && !isRecovered) {
            if (!isVotingWeb3auth && !isWeb3authVoted && web3authAddressIsGuardian) {
                setIsVotingWeb3auth(true)
                const _recoveryProcessId = recoveryProcessId({
                    profileAddress: inputUniversalProfileAddress,
                    newOwnerAddress: upAddress
                });
                console.log("Recovery process id: ", _recoveryProcessId);
                lumuksoSocialRecovery
                    .getGuardianVote(_recoveryProcessId, web3authAddress)
                    .then(votedAddress => {
                        if (votedAddress.toLowerCase() !== upAddress.toLowerCase()) {
                            return lumuksoSocialRecovery
                                .getVoteToRecoverMessage(_recoveryProcessId, upAddress)
                                .then(voteToRecoverMessage => web3authSigner.signMessage(voteToRecoverMessage))
                                .then(signature => lumuksoSocialRecovery.voteToRecoverViaSignature(web3authAddress, _recoveryProcessId, upAddress, signature, {gasLimit: 1000000}))
                                .then(tx => tx.wait())
                                .then(() => setIsWeb3authVoted(true));
                        } else {
                            setIsWeb3authVoted(true)
                        }
                    })
                    .catch(console.error)
                    .finally(() => setIsVotingWeb3auth(false));
            }
        }
    }, [web3authAddress, web3authSigner, loadingWeb3authAddressIsGuardian, isVotingWeb3auth, inputUniversalProfileAddress, upAddress, isWeb3authVoted, isRecovered]);

    const [recoveryProcess, setRecoveryProcess] = useState(null);
    useEffect(() => {
        if (inputUniversalProfileAddress && lumuksoSocialRecovery && upAddress) {
            const _recoveryProcessId = recoveryProcessId({profileAddress: inputUniversalProfileAddress, newOwnerAddress: upAddress});
            lumuksoSocialRecovery
                .countVotes(_recoveryProcessId, upAddress)
                .then(votes => {
                    setRecoveryProcess({
                        votes: votes.toNumber(),
                    });
                });
        }
    }, [inputUniversalProfileAddress, lumuksoSocialRecovery, upAddress, isVotingWeb3auth, isVotingMagic]);

    function recover(oldSecret, newSecret) {
        if (lumuksoSocialRecovery && inputUniversalProfileAddress && upAddress && oldSecret && newSecret && !isRecovering && !isRecovered) {
            setIsRecovering(true);
            const newSecretHash = ethers.utils.solidityKeccak256(["string"], [newSecret])
            const _recoveryProcessId = recoveryProcessId({profileAddress: inputUniversalProfileAddress, newOwnerAddress: upAddress});
            lumuksoSocialRecovery
                .recoverOwnership(_recoveryProcessId, oldSecret, newSecretHash, {gasLimit: 2000000})
                .then(tx => tx.wait())
                .then(() => {
                    setIsRecovered(true);
                }).catch(console.error).finally(() => setIsRecovering(false));
        }
    }

    const oldRecoverySecretRef = useRef(null);
    const newRecoverySecretRef = useRef(null);

    return (
        <>
            <div className="modal" id="recover-modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Set new recovery secret</h3>
                    <p className="py-4">
                        <input type="password"
                               className="input input-bordered w-full mb-2"
                               placeholder="Old recovery secret"
                               ref={oldRecoverySecretRef} />
                        <input type="password"
                               className="input input-bordered w-full"
                               placeholder="New recovery secret"
                               ref={newRecoverySecretRef} />
                    </p>
                    <div className="modal-action">
                        <a href="#" className="btn" onClick={() => recover(oldRecoverySecretRef.current.value, newRecoverySecretRef.current.value)}>Submit</a>
                    </div>
                </div>
            </div>

            <Layout>
                {
                    recoverImage ?
                        <div className="card w-96 mt-6">
                            <figure>
                                {
                                    (recoverLoading) ? <Spinner size="lg"/>
                                        : <img className="h-24 w-24 rounded-full shadow-lg" src={recoverImage} />
                                }
                            </figure>
                            <div className="card-body items-center text-center pb-2">
                                <h2 className="card-title">{recoverName}</h2>
                                <h3>
                                    {
                                        nonRecoverableUniversalProfileAddress ? <div>This universal profile is not recoverable</div>
                                            : recoveryProcess ? <div className="flex">
                                                    {
                                                        (isVotingMagic || isVotingWeb3auth || isLoadingGuardianThreshold) ? <div className="flex"><Spinner /></div>
                                                            : <>
                                                                {
                                                                    "_".repeat(recoveryProcess.votes).split("").map(() => (
                                                                        <UserIcon key={Math.random()} className="w-5 h-5" />
                                                                    ))
                                                                }
                                                                {
                                                                    guardianThreshold ?
                                                                        "_".repeat(guardianThreshold - recoveryProcess.votes).split("").map(() => (
                                                                            <UserIcon key={Math.random()} className="w-5 h-5" fill="#c7c7c7" />
                                                                        )) : null
                                                                }
                                                            </>
                                                    }
                                            </div> : null
                                    }
                                </h3>
                                <div className="card-actions">
                                    {
                                        isRecovered ?
                                            <strong>You have recovered access to this profile!</strong> :
                                            <div className="tooltip tooltip-top" data-tip={`You need ${guardianThreshold} votes to recover this profile`}>
                                                <a href="#recover-modal">
                                                    <button className="btn btn-primary"
                                                            disabled={recoveryProcess && guardianThreshold ? recoveryProcess.votes < guardianThreshold : true}>
                                                        {
                                                            isRecovering ?
                                                                <div className="mr-2">
                                                                    <Spinner />
                                                                </div> : null
                                                        }
                                                        Recover
                                                    </button>
                                                </a>
                                            </div>
                                    }
                                </div>
                            </div>
                        </div> : null
                }

                <input type="text"
                       placeholder="Input your Lukso Universal Profile address to recover"
                       className="input input-bordered input-info w-full"
                       pattern="^0x[0-9a-fA-F]{40}$"
                       onChange={(e) => {
                           setInputUniversalProfileAddress(e.currentTarget.value);
                       }}
                       onInvalid={(e) => e.currentTarget.setCustomValidity("Please input a valid contract address")}
                       value={inputUniversalProfileAddress}
                       disabled={recoverLoading}
                       ref={addressInputRef}/>

                {
                    recoverName && !nonRecoverableUniversalProfileAddress ?
                        <SetupConnect redirect={`/recover/${inputUniversalProfileAddress}`} /> : null
                }

                {
                    recoverImage && !nonRecoverableUniversalProfileAddress ?
                        <button className="btn btn-primary w-full" onClick={() => share({title: " ", text: "", url: `https://${window.location.host}/recover/${inputUniversalProfileAddress}/vote/${upAddress}`})}>
                            Invite Guardians
                        </button> : null
                }
            </Layout>
        </>
    )
}