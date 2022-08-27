import {toast} from "react-toastify";
import {useRef} from "react";
import {useUp} from "../hooks/up";
import {useSocialRecovery} from "../hooks/lumukso";
import {CopyToClipboard} from 'react-copy-to-clipboard';

export function SetupInvite() {
    const notifyCopied = () => toast("Copied to clipboard!", {toastId: "notifyCopied"});
    const socialRecoveryLinkRef = useRef(null);


    const {
        address: universalProfileAddress,
    } = useUp();
    const {
        lumuksoSocialRecovery,
    } = useSocialRecovery();

    return (
        <>
            {
                lumuksoSocialRecovery?.address && universalProfileAddress ?
                    <div className="relative w-full mb-3">
                        <input type="text" id="social-recovery-address-input"
                               className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                               placeholder="Lumukso recovery contract address"
                               value={universalProfileAddress ? `https://${window.location.host}/confirm/${universalProfileAddress}` : ""}
                               onFocus={e => e.currentTarget.select()}
                               ref={socialRecoveryLinkRef}
                               readOnly />
                        <CopyToClipboard text={socialRecoveryLinkRef?.current?.value || ""}
                                         className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 hover:cursor-pointer"
                                         onCopy={notifyCopied}>
                            <div>Copy</div>
                        </CopyToClipboard>
                    </div> : null
            }
        </>
    );
}