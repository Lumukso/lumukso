import {Layout} from "./Layout";
import {useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {ethers} from "ethers";
import {toast, ToastContainer} from "react-toastify";
import {useLumuksoFactory} from "../hooks/lumukso";
import {LumuksoSocialRecovery__factory} from "@lumukso/contracts/types/ethers-contracts/factories/LumuksoSocialRecovery__factory";
import {useUp} from "../hooks/up";

export function Recover() {
    const lumuksoFactory = useLumuksoFactory();
    const {
        signer
    } = useUp();
    let {universalProfileAddress} = useParams();
    const [inputUniversalProfileAddress, setInputUniversalProfileAddress] = useState("");
    const [universalProfileAddressIsValid, setUniversalProfileAddressIsValid] = useState(false);
    const [lumuksoSocialRecovery, setLumuksoSocialRecovery] = useState(null);
    const [nonRecoverableUniversalProfileAddress, setNonRecoverableUniversalProfileAddress] = useState(false);
    const addressInputRef = useRef(null);
    const notifyInvalidUniversalProfileAddress = () => toast("Please input a valid universal profile address", {
        toastId: "notifyInvalidUniversalProfileAddress",
        autoClose: false,
        type: 'error',
    });

    useEffect(() => {
        addressInputRef.current.focus();
    }, []);

    useEffect(() => {
        if (universalProfileAddress) {
            setInputUniversalProfileAddress(universalProfileAddress);
        }
    }, [universalProfileAddress]);

    useEffect(() => {
        if (inputUniversalProfileAddress) {
            if (!ethers.utils.isAddress(inputUniversalProfileAddress)) {
                addressInputRef.current.reportValidity();
                setUniversalProfileAddressIsValid(false);
            } else {
                setUniversalProfileAddressIsValid(true);
            }
        }
    }, [inputUniversalProfileAddress])

    useEffect(() => {
        if (lumuksoFactory && universalProfileAddressIsValid && signer) {
            lumuksoFactory.instances(universalProfileAddress)
                .then((lumuksoAddress : string | ethers.ContractTransaction) => {
                    if (lumuksoAddress !== ethers.constants.AddressZero) {
                        setLumuksoSocialRecovery(LumuksoSocialRecovery__factory.connect(lumuksoAddress.toString(), signer));
                    } else {
                        setNonRecoverableUniversalProfileAddress(true);
                        notifyInvalidUniversalProfileAddress();
                    }
                })
        }
    }, [lumuksoFactory, universalProfileAddressIsValid, signer])

    return (
        <>
            <Layout>
                {
                    lumuksoSocialRecovery ? <>
                        <div className="avatar">
                            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src="https://placeimg.com/192/192/people"/>
                            </div>
                        </div>
                    </> : null
                }

                <input type="text"
                       placeholder="Input your Lukso Universal Profile address to recover"
                       className="input input-bordered input-info w-full"
                       pattern="^0x[0-9a-fA-F]{40}$"
                       onChange={(e) => {
                           setInputUniversalProfileAddress(e.currentTarget.value);
                       }}
                       onInvalid={(e) => e.currentTarget.setCustomValidity("Please input a valid contract address")}
                       value={inputUniversalProfileAddress}
                       ref={addressInputRef} />
            </Layout>
            <ToastContainer position="top-center" autoClose={1000} />
        </>
    )
}