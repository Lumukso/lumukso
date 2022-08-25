import {Account} from "../components/Account";
import Logo from "../components/Logo";
import {QuestionMarkCircleIcon} from "@heroicons/react/outline";
import {useNavigate} from "react-router-dom";
import gridSvgPath from '/assets/grid.svg'

export function Layout(props) {
    const navigate = useNavigate();

    return (
        <>
            <div className={`absolute inset-0 bg-top [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]`} style={{backgroundImage: `url(${gridSvgPath})`}}></div>

            <Account/>

            <div className="flex h-screen justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div className="flex p-8 max-w-lg rounded-2xl border shadow-2xl dark:bg-gray-800 dark:border-gray-700 min-h-[300px] main-card">
                        <div className="flex flex-col grow place-content-center place-items-center h-[inherit] pt-5">
                            <a className="hover:cursor-pointer" onClick={() => navigate('/')}>
                                <Logo className="flex-none mb-2" />
                            </a>
                            <h2 className="text-gray-500">LSP11 Multifactor Recovery of Lukso Profile</h2>
                            <div className="flex flex-col grow justify-center items-center mt-5 mb-4 bt-5 gap-y-2.5 w-full">
                                {props.children}
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
    );
}