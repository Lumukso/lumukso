import luksoLogo from "../../assets/lukso2.png";
import {Spinner} from "flowbite-react";
import magicLogo from "../../assets/magic.png";
import web3authLogo from "../../assets/web3auth.png";
import {useUp} from "../hooks/up";
import {useNavigate} from "react-router-dom";
import {useMagic} from "../hooks/magic";
import {useWeb3auth} from "../hooks/web3auth";
import {ExclamationCircleIcon} from "@heroicons/react/outline";
import {useEffect} from "react";
import {toast} from "react-toastify";

export function SetupConnect() {
    const {
        connect,
        isConnected,
        isConnecting,
        invalid,
    } = useUp();
    const navigate = useNavigate();
    const {magicIsLoggedIn, magicIsLoading, magicAddress} = useMagic();
    const {connect: connectWeb3auth, web3authIsLoggedIn, web3authIsLoading} = useWeb3auth();

    const notifyInvalidWallet = () => toast("Connected wallet is not an Universal Profile", {toastId: "invalidWallet", autoClose: false, type: "error"});

    useEffect(() => {
        if (invalid) {
            notifyInvalidWallet();
        }
    }, [invalid]);

    return (
        <>
            <ul role="list"
                className="divide-y divide-gray-200 dark:divide-gray-700 w-full">
                <li className="py-3 sm:py-4">
                    <div
                        className="flex flex-row align-center items-center space-x-4">
                        <div className="">
                            <img src={luksoLogo} className="lukso-item"/>
                        </div>
                        <div className="whitespace-nowrap justify-self-start grow"></div>
                        <div>
                            <button type="button"
                                    onClick={() => isConnected ? null : connect()}
                                    disabled={isConnecting || isConnected}
                                    className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                {
                                    invalid ? <div className="flex"><ExclamationCircleIcon className="w-5 h-5 mr-2"/>Error
                                        </div> :
                                        (isConnecting || !isConnected) ? <Spinner/> : 'Connected'
                                }
                            </button>
                        </div>
                    </div>
                </li>
                <li className={`py-3 sm:py-4`}>
                    <div className="flex items-center space-x-4 w-full">
                        <div className="">
                            <img src={magicLogo} className="lukso-item"/>
                        </div>
                        <div className="whitespace-nowrap justify-self-start grow"></div>
                        <div className="justify-self-end">
                            <button type="button"
                                    className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                    disabled={magicIsLoggedIn}
                                    onClick={() => magicIsLoggedIn ? null : navigate('/magic-login', {replace: true})}>
                                {
                                    (magicIsLoading) ? <Spinner/> :
                                        magicIsLoggedIn ? 'Connected' : 'Connect'
                                }
                            </button>
                        </div>
                    </div>
                </li>
                <li className={`py-3 sm:py-4`}>
                    <div className="flex items-center space-x-4 w-full">
                        <div className="">
                            <img src={web3authLogo} className="lukso-item"/>
                        </div>
                        <div className="whitespace-nowrap justify-self-start grow"></div>
                        <div className="justify-self-end">
                            <button type="button"
                                    className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                    disabled={web3authIsLoggedIn}
                                    onClick={connectWeb3auth}>
                                {
                                    web3authIsLoading ? <Spinner/> :
                                        web3authIsLoggedIn ? 'Connected' : 'Connect'
                                }
                            </button>
                        </div>
                    </div>
                </li>
            </ul>
        </>
    )
}