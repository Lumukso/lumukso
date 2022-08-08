import {useAccount} from 'wagmi'
import { LockClosedIcon } from '@heroicons/react/solid'
import Logo from "./components/Logo";

export function App() {
    const {isConnected} = useAccount()

    return (
        <>
            <div className="absolute inset-0 bg-[url(/assets/grid.svg)] bg-top [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
            <div className="flex h-screen justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div className="p-4 max-w-sm rounded-2xl border shadow-2xl sm:p-6 dark:bg-gray-800 dark:border-gray-700 main-card">
                        <div className="grid grid-cols-1 gap-4 place-content-center place-items-center">
                            <Logo />
                            {
                                !isConnected ? (
                                    <div>
                                        <button className="relative inline-flex grow items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 glow-on-hover">
                                      <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                          Enable Social Recovery
                                      </span>
                                        </button>
                                    </div>
                                ) : (<div></div>)
                            }
                            <div className="text-right place-self-end">
                                <a href="#" className="inline-flex items-center text-xs font-normal text-gray-500 hover:underline dark:text-gray-400">
                                    <svg className="mr-2 w-3 h-3" aria-hidden="true" focusable="false" data-prefix="far"
                                         data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg"
                                         xmlnsXlink="http://www.w3.org/1999/xlink"
                                         viewBox="0 0 512 512">
                                        <path fill="currentColor"
                                              d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 448c-110.532 0-200-89.431-200-200 0-110.495 89.472-200 200-200 110.491 0 200 89.471 200 200 0 110.53-89.431 200-200 200zm107.244-255.2c0 67.052-72.421 68.084-72.421 92.863V300c0 6.627-5.373 12-12 12h-45.647c-6.627 0-12-5.373-12-12v-8.659c0-35.745 27.1-50.034 47.579-61.516 17.561-9.845 28.324-16.541 28.324-29.579 0-17.246-21.999-28.693-39.784-28.693-23.189 0-33.894 10.977-48.942 29.969-4.057 5.12-11.46 6.071-16.666 2.124l-27.824-21.098c-5.107-3.872-6.251-11.066-2.644-16.363C184.846 131.491 214.94 112 261.794 112c49.071 0 101.45 38.304 101.45 88.8zM298 368c0 23.159-18.841 42-42 42s-42-18.841-42-42 18.841-42 42-42 42 18.841 42 42z"></path>
                                    </svg>
                                    How this works?</a>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}