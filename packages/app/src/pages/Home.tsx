import {useNavigate} from "react-router-dom";
import {useMagic} from "../hooks/magic";
import {Spinner} from "flowbite-react";
import {useEffect, useState} from "react";
import {useLumukso} from "../hooks/lumukso";
import {Account} from "../components/Account";
import Logo from "../components/Logo";
import {QuestionMarkCircleIcon} from "@heroicons/react/outline";
import {useUp} from "../hooks/up";

export function Home() {
    const {connect, provider, isConnected, isConnecting, address: universalProfileAddress, universalProfileOwner} = useUp();
    const {isLoading: isLumuksoLoading, addPendingGuardian, confirmPendingGuardian} = useLumukso();
    const navigate = useNavigate();
    const {magicIsLoggedIn, magicLogout, magicAddress} = useMagic();

    const [isLuksoLoading, setIsLuksoLoading] = useState(true);
    const [isGuardiansDisabled, setIsGuardiansDisabled] = useState(false);

    useEffect(() => {
        if (provider) {
            connect();
        }
    }, [provider]);

    useEffect(() => {
        if (isConnecting || isLumuksoLoading) {
            setIsLuksoLoading(true)
        } else {
            setIsLuksoLoading(false)
        }

        setIsGuardiansDisabled(!isConnected || isLuksoLoading)
    }, [isConnected, isConnecting, isLumuksoLoading]);

    return (
        <>
            <div
                className="absolute inset-0 bg-[url(/assets/grid.svg)] bg-top [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
            <Account/>
            <div className="flex h-screen justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div
                        className="flex p-4 max-w-sm rounded-2xl border shadow-2xl sm:p-6 dark:bg-gray-800 dark:border-gray-700 min-h-[300px] main-card">
                        <div className="flex flex-col grow place-content-center place-items-center h-[inherit] pt-5">
                            <Logo className="flex-none"/>
                            <h2 className="text-gray-500">Lukso social recovery made easy</h2>
                            <div className="flex flex-col grow justify-center items-center mt-5 bt-5 gap-y-2.5 w-full">
                                <div className="flow-root w-full">
                                    <div><small>Lumukso: {}</small></div>
                                    <div><small>LumuksoSocialRecovery: {}</small></div>
                                    <div><small>Universal Profile: {universalProfileAddress}</small></div>
                                    <div><small>Universal Profile Owner: {universalProfileOwner}</small></div>
                                    <div><small>Magic Address: {magicAddress}</small></div>
                                    <div><small>Web3auth Address: {}</small></div>

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
                                                            disabled={isLuksoLoading || isConnected}
                                                            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                                        {
                                                            isLuksoLoading ?
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
                                                            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:grayscale"
                                                            disabled={isGuardiansDisabled || magicIsLoggedIn}
                                                            onClick={() => magicIsLoggedIn ? magicLogout() : navigate('/magic-login', {replace: true})}>
                                                        {
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
                                                            disabled={isGuardiansDisabled}>
                                                        Connect
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="flex-none text-right align-middle self-end items-end pt-5">
                                <a href="#"
                                   className="flex flex-row justify-center items-center self-end text-xs align-middle font-normal text-gray-500 hover:underline dark:text-gray-400">
                                    <QuestionMarkCircleIcon className="mr-1 w-3 h-3" aria-hidden="true"
                                                            focusable="false" data-prefix="far"/>
                                    <span className="align-middle">How this works?</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}