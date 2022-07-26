import {useEffect, useState} from "react";
import {ethers} from "ethers";
import {useUp} from "./up";
import {LumuksoFactory__factory} from '@lumukso/contracts/types/ethers-contracts/factories/LumuksoFactory__factory';
import {LumuksoUtils__factory} from '@lumukso/contracts/types/ethers-contracts/factories/LumuksoUtils__factory';
import {LumuksoUtils} from '@lumukso/contracts/types/ethers-contracts/LumuksoUtils';
import {LumuksoFactory} from '@lumukso/contracts/types/ethers-contracts/LumuksoFactory';
import {
    LumuksoSocialRecovery__factory
} from '@lumukso/contracts/types/ethers-contracts/factories/LumuksoSocialRecovery__factory';
import {createGlobalState} from "react-hooks-global-state";
import {L16_LUMUKSO_FACTORY_ADDRESS, L16_LUMUKSO_UTILS_ADDRESS} from "../constants";

export function useLumuksoFactory() {
    const {signer, isConnected} = useUp();
    const [lumuksoFactory, setLumuksoFactory]: [LumuksoFactory, any] = useState(null);

    useEffect(() => {
        if (isConnected && signer) {
            setLumuksoFactory(new LumuksoFactory__factory(signer).attach(L16_LUMUKSO_FACTORY_ADDRESS));
        } else {
            setLumuksoFactory(null);
        }
    }, [signer, isConnected]);

    return lumuksoFactory;
}

export function useLumuksoUtils() {
    const {signer, isConnected} = useUp();
    const [lumuksoUtils, setLumuksoUtils]: [LumuksoUtils, any] = useState(null);

    useEffect(() => {
        if (isConnected && signer) {
            setLumuksoUtils(new LumuksoUtils__factory(signer).attach(L16_LUMUKSO_UTILS_ADDRESS));
        } else {
            setLumuksoUtils(null);
        }
    }, [signer, isConnected]);

    return lumuksoUtils;
}

const {useGlobalState} = createGlobalState({
    lumuksoSocialRecovery: null,
    guardians: {},
    isGuardiansLoading: false,
    pendingGuardians: {},
    isPendingGuardiansLoading: false,
});

export function useSocialRecovery() {
    const {address: universalProfileAddress, signer, isConnected} = useUp();
    const lumuksoFactory = useLumuksoFactory();

    const [isDeployingSocialRecovery, setIsDeployingSocialRecovery] = useState(false);
    const [triggerDeploySocialRecovery, setTriggerDeploySocialRecovery] = useState(false);
    const [lumuksoSocialRecovery, setLumuksoSocialRecovery] = useGlobalState('lumuksoSocialRecovery');
    const [guardians, setGuardians] = useGlobalState('guardians');
    const [isGuardiansLoading, setIsGuardiansLoading] = useGlobalState('isGuardiansLoading');
    const [pendingGuardians, setPendingGuardians] = useGlobalState('pendingGuardians');
    const [isPendingGuardiansLoading, setIsPendingGuardiansLoading] = useGlobalState('isPendingGuardiansLoading');

    function deploySocialRecovery() {
        setTriggerDeploySocialRecovery(true);
    }

    function addPendingGuardian(guardian) {
        return lumuksoSocialRecovery.addPendingGuardian(guardian, {gasLimit: 1000000});
    }

    async function getConfirmationMessage(guardian) {
        return lumuksoSocialRecovery.getConfirmationMessage(guardian);
    }

    function isGuardian(guardian) {
        return lumuksoSocialRecovery.isGuardian(guardian);
    }

    async function isPendingGuardian(guardian) {
        const [address, _] = await lumuksoSocialRecovery.pendingGuardians(guardian);
        return address !== ethers.constants.AddressZero;
    }

    function confirmPendingGuardian(guardian, rawSignature) {
        return lumuksoSocialRecovery.confirmPendingGuardian(
            guardian,
            rawSignature,
            {gasLimit: 1000000}
        )
            .then((tx) => tx.wait())
            .then(() => loadGuardians());
    }

    // check if there's a deployed instance of Lumukso
    // if not, try to create one via the LumuksoFactory
    useEffect(() => {
        if (lumuksoFactory && universalProfileAddress) {
            lumuksoFactory.instances(universalProfileAddress)
                .then((lumuksoAddress: string | ethers.ContractTransaction) => {
                    if (lumuksoAddress !== ethers.constants.AddressZero) {
                        setLumuksoSocialRecovery(LumuksoSocialRecovery__factory.connect(lumuksoAddress.toString(), signer));
                    }
                })
        }
    }, [lumuksoFactory, universalProfileAddress]);

    useEffect(() => {
        if (triggerDeploySocialRecovery && !isDeployingSocialRecovery && lumuksoFactory && universalProfileAddress && signer) {
            setIsDeployingSocialRecovery(true);
            lumuksoFactory.instances(universalProfileAddress)
                .then((lumuksoAddress: string | ethers.ContractTransaction) => {
                    if (lumuksoAddress === ethers.constants.AddressZero) {
                        return lumuksoFactory.create(universalProfileAddress, 1).then(tx => tx.wait()).then(receipt => {
                            return Promise.resolve(receipt.events.find(e => e.event === "LumuksoDeployed").args[0]);
                        });
                    } else {
                        return Promise.resolve(lumuksoAddress);
                    }
                })
                .then((lumuksoAddress) => {
                    setLumuksoSocialRecovery(LumuksoSocialRecovery__factory.connect(lumuksoAddress.toString(), signer));
                })
                .catch(console.error)
                .finally(() => {
                    setTriggerDeploySocialRecovery(false);
                    setIsDeployingSocialRecovery(false);
                })
        }
    }, [triggerDeploySocialRecovery, isDeployingSocialRecovery, lumuksoFactory, universalProfileAddress, signer]);

    function loadGuardians() {
        if (lumuksoSocialRecovery && !isGuardiansLoading) {
            setIsGuardiansLoading(true);
            lumuksoSocialRecovery.getGuardians()
                .then(guardians => {
                    guardians.forEach(guardian => {
                        setGuardians((prevState) => ({
                            ...prevState,
                            [guardian.toString().toLowerCase()]: true,
                        }))
                    });
                })
                .catch(console.error)
                .finally(() => {
                    setIsGuardiansLoading(false);
                })
        }
    }

    useEffect(() => {
        loadGuardians();

        if (lumuksoSocialRecovery && !isPendingGuardiansLoading) {
            setIsPendingGuardiansLoading(true);
            lumuksoSocialRecovery.getInvitations()
                .then(pendingGuardians => {
                    pendingGuardians.forEach(pendingGuardian => {
                        setPendingGuardians((prevState) => ({
                            ...prevState,
                            [pendingGuardian.toLowerCase()]: true,
                        }))
                    });
                })
                .catch(console.error)
                .finally(() => {
                    setIsPendingGuardiansLoading(false)
                })
        }
    }, [lumuksoSocialRecovery]);

    return {
        isDeployingSocialRecovery,
        lumuksoSocialRecovery,
        deploySocialRecovery,
        addPendingGuardian,
        getConfirmationMessage,
        isGuardian,
        isPendingGuardian,
        confirmPendingGuardian,
        guardians,
        isGuardiansLoading,
        pendingGuardians,
        isPendingGuardiansLoading,
    }
}