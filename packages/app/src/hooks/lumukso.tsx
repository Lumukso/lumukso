import {useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction} from "wagmi";
import {abi as LumuksoFactoryABI} from '@lumukso/contracts/artifacts/LumuksoFactory.sol/LumuksoFactory.json';
const LUMUKSO_FACTORY_ADDRESS = import.meta.env.LUMUKSO_FACTORY;

function useLumuksoFactory() {
    const { address, isConnected } = useAccount();
    const { config } = usePrepareContractWrite({
        addressOrName: LUMUKSO_FACTORY_ADDRESS,
        contractInterface: LumuksoFactoryABI,
        functionName: 'create',
        args: [address],
    })
    const { data, write } = useContractWrite(config);
    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
    })

    function createSocialRecovery() {
        if (!isConnected) {
            console.error("Not connected");
            return;
        }

        write?.();
    }

    return {
        createSocialRecovery,
        createSocialRecoveryLoading: isLoading,
        createSocialRecoverySuccess: isSuccess,
    }
}

export {
    useLumuksoFactory,
}