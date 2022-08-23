import {useProfile} from "../hooks/profile";
import {useUp} from "../hooks/up";

export function Account() {
    const { address, name, image } = useProfile();

    return (
        address && image ?
        <a className="fixed top-2 right-2 flex flex-row items-center max-w-[15rem] rounded-2xl border shadow-2xl dark:bg-gray-800 dark:border-gray-700 main-card"
           href={`https://l16.universalprofile.cloud/${address}`}
           target="_blank">
            <img src={image}
                 className="p-1 w-10 h-10 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"/>
            <div className="pl-2 pr-2 truncate">
                {
                    name ?
                        name :
                        address
                }
            </div>
        </a> : <></>
    )
}
