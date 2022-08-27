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
import {LumuksoSocialRecovery} from '@lumukso/contracts/types/ethers-contracts/LumuksoSocialRecovery';
import {createGlobalState} from "react-hooks-global-state";

const LUMUKSO_FACTORY_ADDRESS = import.meta.env.VITE_LUMUKSO_FACTORY;
const LUMUKSO_UTILS_ADDRESS = import.meta.env.VITE_LUMUKSO_UTILS;

export function useLumuksoFactory() {
    const { signer, isConnected } = useUp();
    const [lumuksoFactory, setLumuksoFactory] : [LumuksoFactory, any] = useState(null);

    useEffect(() => {
        if (isConnected && signer) {
            setLumuksoFactory(new LumuksoFactory__factory(signer).attach(LUMUKSO_FACTORY_ADDRESS));
        } else {
            setLumuksoFactory(null);
        }
    }, [signer, isConnected]);

    return lumuksoFactory;
}

export function useLumuksoUtils() {
    const { signer, isConnected } = useUp();
    const [lumuksoUtils, setLumuksoUtils] : [LumuksoUtils, any] = useState(null);

    useEffect(() => {
        if (isConnected && signer) {
            setLumuksoUtils(new LumuksoUtils__factory(signer).attach(LUMUKSO_UTILS_ADDRESS));
        } else {
            setLumuksoUtils(null);
        }
    }, [signer, isConnected]);

    return lumuksoUtils;
}

const { useGlobalState } = createGlobalState({
    lumuksoSocialRecovery: null,
});


export function useSocialRecovery() {
    const { address: universalProfileAddress, signer, isConnected } = useUp();
    const lumuksoFactory = useLumuksoFactory();

    const [isDeployingSocialRecovery, setIsDeployingSocialRecovery] = useState(false);
    const [triggerDeploySocialRecovery, setTriggerDeploySocialRecovery] = useState(false);
    const [lumuksoSocialRecovery, setLumuksoSocialRecovery] = useGlobalState('lumuksoSocialRecovery');

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

    // check if there's a deployed instance of Lumukso
    // if not, try to create one via the LumuksoFactory
    useEffect(() => {
        if (triggerDeploySocialRecovery && !isDeployingSocialRecovery && lumuksoFactory && universalProfileAddress && signer) {
            setIsDeployingSocialRecovery(true);
            lumuksoFactory.instances(universalProfileAddress)
                .then((lumuksoAddress : string | ethers.ContractTransaction) => {
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

    return {
        isDeployingSocialRecovery,
        lumuksoSocialRecovery,
        deploySocialRecovery,
        addPendingGuardian,
        getConfirmationMessage,
        isGuardian,
        isPendingGuardian,
    }
}