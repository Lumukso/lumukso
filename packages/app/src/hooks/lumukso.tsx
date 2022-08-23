import {useEffect, useState} from "react";
import {ethers} from "ethers";
import {useUp} from "./up";
import {LumuksoFactory__factory} from '@lumukso/contracts/types/ethers-contracts/factories/LumuksoFactory__factory';
import {LumuksoFactory} from '@lumukso/contracts/types/ethers-contracts/LumuksoFactory';
import {Lumukso__factory} from '@lumukso/contracts/types/ethers-contracts/factories/Lumukso__factory';
import {Lumukso} from '@lumukso/contracts/types/ethers-contracts/Lumukso';
import {LumuksoSocialRecovery__factory} from '@lumukso/contracts/types/ethers-contracts/factories/LumuksoSocialRecovery__factory';
import {LumuksoSocialRecovery} from '@lumukso/contracts/types/ethers-contracts/LumuksoSocialRecovery';

const LUMUKSO_FACTORY_ADDRESS = import.meta.env.VITE_LUMUKSO_FACTORY;

export function useLumukso() {
    const { address: universalProfileAddress, signer, isConnected } = useUp();

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [lumuksoFactory, setLumuksoFactory] : [LumuksoFactory, any] = useState(null);
    const [lumukso, setLumukso] : [Lumukso, any] = useState(null);
    const [lumuksoSocialRecovery, setLumuksoSocialRecovery] : [LumuksoSocialRecovery, any] = useState(null);

    async function addPendingGuardian(guardian) {
        return lumuksoSocialRecovery.addPendingGuardian(guardian);
    }

    async function confirmPendingGuardian(signer, guardian) {
        const expiration = await lumuksoSocialRecovery.getPendingGuardianExpiration(guardian);
        const message = `operation=confirmPendingGuardian&expirationTimestamp=${expiration}&socialRecoveryAddress=${ethers.utils.solidityPack(["address"], [guardian])}`;
        const signature = ethers.utils.splitSignature(signer.signMessage(message));
        return lumuksoSocialRecovery.confirmPendingGuardian(guardian, signature.r, signature.s, signature.v);
    }

    useEffect(() => {
        if (isConnected && universalProfileAddress && signer) {
            setLumuksoFactory(new LumuksoFactory__factory(signer).attach(LUMUKSO_FACTORY_ADDRESS));
        } else {
            setLumuksoFactory(null);
        }
    }, [universalProfileAddress, signer, isConnected]);

    // check if there's a deployed instance of Lumukso
    // if not, try to create one via the LumuksoFactory
    useEffect(() => {
        if (lumuksoFactory && universalProfileAddress && signer) {
            setIsLoading(true);
            lumuksoFactory.instances(universalProfileAddress)
                .then(async (lumuksoAddress) => {
                    if (lumuksoAddress === "0x0000000000000000000000000000000000000000") {
                        lumuksoAddress = await lumuksoFactory.create(universalProfileAddress);
                    }

                    const _lumukso = new Lumukso__factory(signer).attach(lumuksoAddress);
                    setLumukso(_lumukso);
                    setLumuksoSocialRecovery(new LumuksoSocialRecovery__factory(signer).attach(await _lumukso.socialRecovery()));
                })
                .catch(setError)
                .finally(() => setIsLoading(false))
        } else {
            setLumukso(null);
            setLumuksoSocialRecovery(null);
        }
    }, [lumuksoFactory, universalProfileAddress, signer]);

    return {
        isLoading,
        error,
        lumuksoFactory,
        lumukso,
        lumuksoSocialRecovery,
        addPendingGuardian,
        confirmPendingGuardian,
    }
}
