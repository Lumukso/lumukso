import useWebShare from "react-use-web-share";
import {Layout} from "./Layout";
import {useSocialRecovery} from "../hooks/lumukso";
import {useEffect, useState} from "react";
import {loadProfile} from "../hooks/profile";
import {ShareIcon} from "@heroicons/react/outline";
import {useUp} from "../hooks/up";

export function PendingInvitations() {
    const { loading, isSupported, share } = useWebShare();
    const {address: universalProfileAddress} = useUp();
    const {
        pendingGuardians,
        isPendingGuardiansLoading,
    } = useSocialRecovery();
    const [pendingGuardianSet, setPendingGuardianSet] = useState(new Set());
    const [pendingGuardianList, setPendingGuardianList] = useState([]);

    useEffect(() => {
        if (pendingGuardians) {
            Object.keys(pendingGuardians).forEach((pendingGuardian) => {
                if (!pendingGuardianSet.has(pendingGuardian)) {
                    loadProfile({address: pendingGuardian}).then((profile) => {
                        if (!pendingGuardianSet.has(profile.address)) {
                            setPendingGuardianSet((_pendingGuardianSet) => _pendingGuardianSet.add(profile.address));
                            setPendingGuardianList((pendingGuardianList) => [...pendingGuardianList, profile]);
                        }
                    });
                }
            });
        }
    }, [pendingGuardians]);

    return (
        <Layout>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <tbody>

                    {
                        isPendingGuardiansLoading ?

                            <div role="status"
                                 className="p-4 max-w-sm rounded border border-gray-200 shadow animate-pulse md:p-6 dark:border-gray-700">
                                <div className="flex items-center space-x-3">
                                    <svg className="w-14 h-14 text-gray-200 dark:text-gray-700" aria-hidden="true"
                                         fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd"
                                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                                              clip-rule="evenodd"></path>
                                    </svg>
                                    <div>
                                        <div
                                            className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
                                        <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                    </div>
                                </div>
                            </div>

                            : pendingGuardianList.map((pendingGuardian) => (
                            <tr>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-circle w-12 h-12">
                                                <img src={pendingGuardian.image}
                                                     alt="Avatar Tailwind CSS Component"/>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{pendingGuardian.name}</div>
                                            <div className="text-sm opacity-50 w-[12rem] text-ellipsis overflow-hidden whitespace-nowrap">{pendingGuardian.address}</div>
                                        </div>
                                    </div>
                                </td>
                                <th className="p-1">
                                    <button className="btn btn-ghost btn-circle" onClick={() => share({title: " ", text: "", url: `https://${window.location.host}/confirm/${universalProfileAddress}/${pendingGuardian.address}`})}>
                                        <ShareIcon className="w-5 h-5" />
                                    </button>
                                </th>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </Layout>
    )
}