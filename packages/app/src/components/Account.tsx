import { useAccount, useEnsName } from 'wagmi'
import {useProfile} from "../hooks/profile";

export function Account() {
    const { address } = useAccount()
    const { name, image } = useProfile();

    return (
        <a className="fixed top-2 right-2 flex flex-row items-center max-w-[15rem] rounded-2xl border shadow-2xl dark:bg-gray-800 dark:border-gray-700 main-card"
           href={`https://explorer.execution.l16.lukso.network/address/${address}`}
           target="_blank">
            <img src={image}
                 className="p-1 w-10 h-10 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"/>
            <div className="pl-1 pr-2 truncate">
                {
                    name ?
                        `${name} (${address})` :
                        address
                }
            </div>
        </a>
    )
}
