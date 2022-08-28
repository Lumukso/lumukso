import {useEffect, useState} from "react";
import {useUp} from "../hooks/up";
import {useLumuksoUtils, useSocialRecovery} from "../hooks/lumukso";
import {useNavigate} from "react-router-dom";
import {useMagic} from "../hooks/magic";
import {useWeb3auth} from "../hooks/web3auth";
import {CheckCircleIcon, CheckIcon} from "@heroicons/react/solid";
import {Spinner} from "flowbite-react";
import {ethers} from "ethers";
import {L16_CHAIN_ID} from "../constants";

export function SetupDeploy() {
    const [updatingPermissions, setUpdatingPermissions] = useState(false);
    const [permissionsUpdated, setPermissionsUpdated] = useState(false);

    const [addingMagicLinkGuardian, setAddingMagicLinkGuardian] = useState(false);
    const [magicLinkGuardianAdded, setMagicLinkGuardianAdded] = useState(false);

    const [confirmingMagicLinkGuardian, setConfirmingMagicLinkGuardian] = useState(false);
    const [magicLinkGuardianConfirmed, setMagicLinkGuardianConfirmed] = useState(false);

    const [addingWeb3authGuardian, setAddingWeb3authGuardian] = useState(false);
    const [web3authGuardianAdded, setWeb3authGuardianAdded] = useState(false);

    const [confirmingWeb3authGuardian, setConfirmingWeb3authGuardian] = useState(false);
    const [web3authGuardianConfirmed, setWeb3authGuardianConfirmed] = useState(false);

    const {
        signer: upSigner,
        address: universalProfileAddress,
        universalProfile,
    } = useUp();
    const {
        lumuksoSocialRecovery,
        isPendingGuardian,
        deploySocialRecovery,
        addPendingGuardian,
        getConfirmationMessage,
        isDeployingSocialRecovery,
        isGuardian,
        confirmPendingGuardian,
        guardians,
    } = useSocialRecovery();
    const lumuksoUtils = useLumuksoUtils();
    const {magicSigner, magicAddress} = useMagic();
    const {web3authAddress, web3authIsLoggedIn, signer: web3authSigner} = useWeb3auth();

    useEffect(() => {
        deploySocialRecovery();
    }, []);

    // updating permissions
    useEffect(() => {
        if (lumuksoUtils && lumuksoSocialRecovery && !updatingPermissions && !permissionsUpdated) {
            setUpdatingPermissions(true);

            lumuksoUtils.checkSocialRecoveryPermissions(universalProfileAddress, lumuksoSocialRecovery.address)
                .then((result) => {
                    if (result) {
                        setPermissionsUpdated(true);
                    } else {
                        return lumuksoUtils.getSocialRecoveryPermissionKeyValues(universalProfileAddress, lumuksoSocialRecovery.address)
                            .then((result) => {
                                const [keys, values] = result;
                                return universalProfile["setData(bytes32[],bytes[])"](keys, values, {gasLimit: 2000000});
                            })
                            .then((tx) => tx.wait())
                            .then(() => {
                                setPermissionsUpdated(true);
                            });
                    }
                })
                .catch(console.error)
                .finally(() => setUpdatingPermissions(false))
        }
    }, [lumuksoUtils, universalProfile, lumuksoSocialRecovery, updatingPermissions, permissionsUpdated]);

    // adding magic link guardian
    useEffect(() => {
        if (!addingMagicLinkGuardian && !magicLinkGuardianAdded && lumuksoSocialRecovery && permissionsUpdated) {
            setAddingMagicLinkGuardian(true);
            lumuksoSocialRecovery
                .isGuardian(magicAddress)
                .then(isGuardian => {
                    if (isGuardian) {
                        return Promise.resolve();
                    } else {
                        return isPendingGuardian(magicAddress)
                            .then(isPending => {
                                if (!isPending) {
                                    return addPendingGuardian(magicAddress).then((tx) => tx.wait());
                                } else {
                                    return Promise.resolve();
                                }
                            })
                    }
                })
                .then(() => setMagicLinkGuardianAdded(true))
                .catch(console.error)
                .finally(() => setAddingMagicLinkGuardian(false));
        }
    }, [magicLinkGuardianAdded, addingMagicLinkGuardian, lumuksoSocialRecovery, permissionsUpdated]);

    useEffect(() => {
        if (magicLinkGuardianAdded && !magicLinkGuardianConfirmed) {
            setConfirmingMagicLinkGuardian(true);
            lumuksoSocialRecovery.isGuardian(magicAddress)
                .then((isGuardian) => {
                    if (isGuardian) {
                        return Promise.resolve();
                    } else {
                        return getConfirmationMessage(magicAddress)
                            .then((message) => {
                                return magicSigner.signMessage(message)
                            })
                            .then((rawSignature) => {
                                console.log("rawSignature", rawSignature);
                                return confirmPendingGuardian(
                                    magicSigner.getAddress(),
                                    rawSignature,
                                );
                            });
                    }
                })
                .then(() => {
                    setMagicLinkGuardianConfirmed(true);
                })
                .catch(console.error)
                .finally(() => setConfirmingMagicLinkGuardian(false));
        }
    }, [magicLinkGuardianAdded, magicLinkGuardianConfirmed]);

    // adding web3auth.io guardian
    useEffect(() => {
        if (!addingWeb3authGuardian && !web3authGuardianAdded && lumuksoSocialRecovery && magicLinkGuardianConfirmed) {
            setAddingWeb3authGuardian(true);
            lumuksoSocialRecovery
                .isGuardian(web3authAddress)
                .then(isGuardian => {
                    if (isGuardian) {
                        return Promise.resolve();
                    } else {
                        return isPendingGuardian(web3authAddress)
                            .then(isPending => {
                                if (!isPending) {
                                    return addPendingGuardian(web3authAddress).then((tx) => tx.wait());
                                } else {
                                    return Promise.resolve();
                                }
                            })
                    }
                })
                .then(() => setWeb3authGuardianAdded(true))
                .catch(console.error)
                .finally(() => setAddingWeb3authGuardian(false));
        }
    }, [addingWeb3authGuardian, web3authGuardianAdded, lumuksoSocialRecovery, magicLinkGuardianConfirmed]);

    useEffect(() => {
        if (web3authGuardianAdded && !web3authGuardianConfirmed && web3authSigner) {
            setConfirmingWeb3authGuardian(true);
            lumuksoSocialRecovery.isGuardian(web3authAddress)
                .then((isGuardian) => {
                    if (isGuardian) {
                        return Promise.resolve();
                    } else {
                        return getConfirmationMessage(web3authAddress)
                            .then((message) => {
                                return web3authSigner.signMessage(message)
                            })
                            .then((rawSignature) => {
                                console.log("rawSignature", rawSignature);
                                return confirmPendingGuardian(
                                    web3authSigner.getAddress(),
                                    rawSignature,
                                );
                            });
                    }
                })
                .then(() => {
                    setWeb3authGuardianConfirmed(true);
                })
                .catch(console.error)
                .finally(() => setConfirmingWeb3authGuardian(false));
        }
    }, [web3authSigner, web3authGuardianAdded, web3authGuardianConfirmed]);

    return (
        <div className="w-full mt-5 mx-5">
            <ul className="w-full space-y-4 text-left text-gray-500 dark:text-gray-400">
                <li className="flex items-center space-x-3">
                    {
                        lumuksoSocialRecovery
                            ? <CheckCircleIcon className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" />
                            : <Spinner size="sm" />
                    }
                    <span>Deploying Social Recovery Contract</span>
                </li>

                {
                    lumuksoSocialRecovery ?
                        <li className="flex items-center space-x-3">
                            {
                                permissionsUpdated ? <CheckCircleIcon className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor"/>
                                    : <Spinner size="sm"/>
                            }
                            <span>Updating Permissions</span>
                        </li> : null
                }

                {
                    permissionsUpdated ?
                        <li className="flex items-center space-x-3">
                            {
                                magicLinkGuardianAdded ? <CheckCircleIcon className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" />
                                    : <Spinner size="sm" />
                            }
                            <span>Adding Magic.link guardian</span>
                        </li> : null
                }

                {
                    magicLinkGuardianAdded ?
                        <li className="flex items-center space-x-3">
                            {
                                magicLinkGuardianConfirmed ? <CheckCircleIcon className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" />
                                    : <Spinner size="sm" />
                            }
                            <span>Confirming Magic.link guardian</span>
                        </li> : null
                }

                {
                    magicLinkGuardianConfirmed ?
                        <li className="flex items-center space-x-3">
                            {
                                web3authGuardianAdded ? <CheckCircleIcon className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" />
                                    : <Spinner size="sm" />
                            }
                            <span>Adding Web3auth.io guardian</span>
                        </li> : null
                }

                {
                    web3authGuardianAdded ?
                        <li className="flex items-center space-x-3">
                            {
                                web3authGuardianConfirmed ? <CheckCircleIcon className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" />
                                    : <Spinner size="sm" />
                            }
                            <span>Confirming Web3auth.io guardian</span>
                        </li> : null
                }
            </ul>
        </div>
    );
}
