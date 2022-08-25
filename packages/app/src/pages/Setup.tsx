import {useNavigate} from "react-router-dom";
import {useMagic} from "../hooks/magic";
import {Spinner} from "flowbite-react";
import {useEffect, useState} from "react";
import {useLumukso} from "../hooks/lumukso";
import {useUp} from "../hooks/up";
import {useWeb3auth} from "../hooks/web3auth";
import {Layout} from "./Layout";

export function Setup() {
    const {
        connect,
        signer: upSigner,
        isConnected,
        isConnecting,
        address: universalProfileAddress,
        universalProfileOwner
    } = useUp();
    const {
        isLoading: isLumuksoLoading,
        lumuksoSocialRecovery,
        getConfirmationMessage,
        isPendingGuardian
    } = useLumukso();
    const navigate = useNavigate();
    const {magicIsLoggedIn, magicIsLoading, magicAddress} = useMagic();
    const {connect: connectWeb3auth, web3authAddress, web3authIsLoggedIn, web3authIsLoading} = useWeb3auth();

    const [isGuardiansDisabled, setIsGuardiansDisabled] = useState(false);
    const [addingPendingGuardian, setAddingPendingGuardian] = useState(false);
    const [pendingGuardians, setPendingGuardians] = useState({});

    useEffect(() => {
        setIsGuardiansDisabled(!isConnected || isConnecting);
    }, [isConnected, isConnecting]);

    useEffect(() => {
        if (lumuksoSocialRecovery && magicIsLoggedIn && !addingPendingGuardian) {
            isPendingGuardian(magicAddress).then(isPending => {
                if (!isPending) {
                    setAddingPendingGuardian(true);
                    return lumuksoSocialRecovery.connect(upSigner).addPendingGuardian(magicAddress).then(tx => tx.wait()).finally(() => setAddingPendingGuardian(false));
                } else {
                    // TODO: confirm pending guardian
                    setPendingGuardians(Object.assign(pendingGuardians, {[magicAddress]: true}));
                }
            })
        }
    }, [lumuksoSocialRecovery, magicIsLoggedIn, isPendingGuardian, addingPendingGuardian, pendingGuardians, magicAddress, upSigner])

    useEffect(() => {
        if (lumuksoSocialRecovery && web3authIsLoggedIn && !addingPendingGuardian) {
            isPendingGuardian(web3authAddress).then(isPending => {
                if (!isPending) {
                    setAddingPendingGuardian(true);
                    return lumuksoSocialRecovery.connect(upSigner).addPendingGuardian(web3authAddress).then(tx => tx.wait()).finally(() => setAddingPendingGuardian(false));
                } else {
                    // TODO: confirm pending guardian
                    setPendingGuardians(Object.assign(pendingGuardians, {[web3authAddress]: true}));
                }
            })
        }
    }, [lumuksoSocialRecovery, web3authIsLoggedIn, web3authAddress, isPendingGuardian, addingPendingGuardian, pendingGuardians, upSigner])

    return (
        <Layout>
            <div className="flow-root w-full">
                {
                    /**
                    <div><small>LumuksoSocialRecovery: {lumuksoSocialRecovery?.address}</small></div>
                    <div><small>Universal Profile: {universalProfileAddress}</small></div>
                    <div><small>Universal Profile Owner: {universalProfileOwner}</small></div>
                    <div><small>Magic Address: {magicAddress}</small></div>
                    <div><small>Web3auth Address: {web3authAddress} </small></div>
                     */
                }

                <ul role="list"
                    className="divide-y divide-gray-200 dark:divide-gray-700 w-full">
                    <li className="py-3 sm:py-4">
                        <div
                            className="flex flex-row align-center items-center space-x-4">
                            <div className="">
                                <img src="/assets/lukso2.png" className="lukso-item"/>
                            </div>
                            <div className="whitespace-nowrap justify-self-start grow"></div>
                            <div>
                                <button type="button"
                                        onClick={() => isConnected ? null : connect()}
                                        disabled={isConnecting || isConnected}
                                        className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                    {
                                        (isConnecting || isLumuksoLoading) ?
                                            <Spinner/>
                                            : isConnected ? 'Connected' : 'Connect'
                                    }
                                </button>
                            </div>
                        </div>
                    </li>
                    <li className={`py-3 sm:py-4 ${isGuardiansDisabled ? 'grayscale' : ''}`}>
                        <div className="flex items-center space-x-4 w-full">
                            <div className="">
                                <img src="/assets/magic.png" className="lukso-item"/>
                            </div>
                            <div className="whitespace-nowrap justify-self-start grow"></div>
                            <div className="justify-self-end">
                                <button type="button"
                                        className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                        disabled={isGuardiansDisabled || magicIsLoggedIn}
                                        onClick={() => magicIsLoggedIn ? null : navigate('/magic-login', {replace: true})}>
                                    {
                                        (magicIsLoading || addingPendingGuardian) ? <Spinner/> :
                                            magicIsLoggedIn ? 'Connected' : 'Connect'
                                    }
                                </button>
                            </div>
                        </div>
                    </li>
                    <li className={`py-3 sm:py-4 ${isGuardiansDisabled ? 'grayscale' : ''}`}>
                        <div className="flex items-center space-x-4 w-full">
                            <div className="">
                                <img src="/assets/web3auth.png" className="lukso-item"/>
                            </div>
                            <div className="whitespace-nowrap justify-self-start grow"></div>
                            <div className="justify-self-end">
                                <button type="button"
                                        className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                        disabled={isGuardiansDisabled || web3authIsLoggedIn}
                                        onClick={connectWeb3auth}>
                                    {
                                        (web3authIsLoading || addingPendingGuardian) ? <Spinner/> :
                                            web3authIsLoggedIn ? 'Connected' : 'Connect'
                                    }
                                </button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </Layout>
    )
}