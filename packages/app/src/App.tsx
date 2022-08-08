import {useAccount} from 'wagmi'
import Logo from "./components/Logo";
import {Button} from "flowbite-react/lib/esm/components/Button";
import {LightningBoltIcon, QuestionMarkCircleIcon} from "@heroicons/react/outline";
import { Switch } from '@headlessui/react';

export function App() {
    const {isConnected} = useAccount()

    return (
        <>
            <div className="absolute inset-0 bg-[url(/assets/grid.svg)] bg-top [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
            <div className="flex h-screen justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div className="flex p-4 max-w-sm rounded-2xl border shadow-2xl sm:p-6 dark:bg-gray-800 dark:border-gray-700 min-h-[300px] main-card">
                        <div className="flex flex-col grow place-content-center place-items-center h-[inherit] pt-5">
                            <Logo className="flex-none" />
                            <div className="flex flex-col grow justify-center items-center mt-5 bt-5 gap-y-2.5">
                                {
                                    !isConnected ? (
                                        <>
                                            <Button
                                                outline={true}
                                                gradientDuoTone="purpleToBlue"
                                                size="">
                                                <span className="flex flex-row items-center relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 text-magic-purple group-hover:text-white text-lg">
                                                    <LightningBoltIcon className="w-4 h-4 mr-1" />
                                                    <span>Enable Social Recovery</span>
                                                </span>
                                            </Button>
                                            <Button
                                                outline={true}
                                                gradientDuoTone="purpleToBlue"
                                                size="">
                                                <span className="flex flex-row items-center relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 text-magic-purple group-hover:text-white text-lg">
                                                    <LightningBoltIcon className="w-4 h-4 mr-1" />
                                                    <span>Login MagicLink</span>
                                                </span>
                                            </Button>
                                            <Button
                                                outline={true}
                                                gradientDuoTone="purpleToBlue"
                                                size="">
                                                <span className="flex flex-row items-center relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 text-magic-purple group-hover:text-white text-lg">
                                                    <LightningBoltIcon className="w-4 h-4 mr-1" />
                                                    <span>Login Twitter</span>
                                                </span>
                                            </Button>
                                            <Button
                                                outline={true}
                                                gradientDuoTone="purpleToBlue"
                                                size="">
                                                <span className="flex flex-row items-center relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 text-magic-purple group-hover:text-white text-lg">
                                                    <LightningBoltIcon className="w-4 h-4 mr-1" />
                                                    <span>Recover My Profile</span>
                                                </span>
                                            </Button>
                                        </>
                                    ) : (<div></div>)
                                }
                            </div>
                            <div className="flex-none text-right align-middle self-end items-end pt-5">
                                <a href="#" className="flex flex-row justify-center items-center self-end text-xs align-middle font-normal text-gray-500 hover:underline dark:text-gray-400">
                                    <QuestionMarkCircleIcon className="mr-1 w-3 h-3" aria-hidden="true" focusable="false" data-prefix="far" />
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