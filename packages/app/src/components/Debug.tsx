import {useUp} from "../hooks/up";
import {useLumuksoFactory, useSocialRecovery} from "../hooks/lumukso";
import {useMagic} from "../hooks/magic";
import {useWeb3auth} from "../hooks/web3auth";

export function Debug() {
    const {
        address: universalProfileAddress,
        universalProfileOwner
    } = useUp();
    const lumuksoFactory = useLumuksoFactory();
    const {
        lumuksoSocialRecovery,
        guardians,
        pendingGuardians,
    } = useSocialRecovery();
    const {
        magicAddress
    } = useMagic();
    const {
        web3authAddress
    } = useWeb3auth();

    if (import.meta.env.DEV) {
        return (
            <div className="absolute top-1 left-1">
                <div><small>LumuksoFactory: {lumuksoFactory?.address}</small></div>
                <div><small>LumuksoSocialRecovery: {lumuksoSocialRecovery?.address}</small></div>
                <div><small>Universal Profile: {universalProfileAddress}</small></div>
                <div><small>Universal Profile Owner: {universalProfileOwner}</small></div>
                <div><small>Magic Address: {magicAddress}</small></div>
                <div><small>Web3auth Address: {web3authAddress} </small></div>
                <div><small>Guardians: {Object.keys(guardians).join(", ")}</small></div>
                <div><small>Pending: {Object.keys(pendingGuardians).join(", ")}</small></div>
            </div>
        )
    } else {
        return <></>
    }
}