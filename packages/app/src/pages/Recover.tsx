import {Layout} from "./Layout";
import {useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {ethers} from "ethers";
import {toast, ToastContainer} from "react-toastify";
import {useUp} from "../hooks/up";

export function Recover() {
    const {
        connect,
        signer: upSigner,
        isConnected,
        isConnecting,
        address: universalProfileAddress,
        universalProfileOwner
    } = useUp();

    let {socialRecoveryAddress} = useParams();
    const [inputSocialRecoveryAddress, setInputSocialRecoveryAddress] = useState("");
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
        if (socialRecoveryAddress) {
            setInputSocialRecoveryAddress(socialRecoveryAddress);
        }
    }, [socialRecoveryAddress]);

    useEffect(() => {
        if (inputSocialRecoveryAddress && !ethers.utils.isAddress(inputSocialRecoveryAddress)) {
            addressInputRef.current.reportValidity();
        }
    }, [inputSocialRecoveryAddress])

    return (
        <>
            <Layout>
                <input type="text"
                       placeholder="Input your Lukso Universal Profile address to recover"
                       className="input input-bordered input-info w-full"
                       pattern="^0x[0-9a-fA-F]{40}$"
                       onChange={(e) => {
                           setInputSocialRecoveryAddress(e.currentTarget.value);
                       }}
                       onInvalid={(e) => e.currentTarget.setCustomValidity("Please input a valid contract address")}
                       value={inputSocialRecoveryAddress}
                       ref={addressInputRef} />
                {
                    // TODO: add "Is this you?"
                }
            </Layout>
            <ToastContainer position="top-center" autoClose={1000} />
        </>
    )
}