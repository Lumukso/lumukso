import {useMagic} from "../hooks/magic";
import {useEffect, useState} from "react";
import {useUp} from "../hooks/up";
import {useWeb3auth} from "../hooks/web3auth";
import {Layout} from "./Layout";
import {ToastContainer} from 'react-toastify';
import {SetupConnect} from "../components/SetupConnect";
import {SetupDeploy} from "../components/SetupDeploy";
import {SetupInvite} from "../components/SetupInvite";

export function Setup() {
    const {
        address: universalProfileAddress,
        invalid,
    } = useUp();
    const {magicAddress} = useMagic();
    const {web3authAddress} = useWeb3auth();

    const [currentStep, setCurrentStep] = useState(1);

    useEffect(() => {
        if (!invalid && universalProfileAddress && magicAddress && web3authAddress) {
            setCurrentStep(2);
        }
    }, [universalProfileAddress, magicAddress, web3authAddress, invalid]);

    return (
        <>
            <Layout>
                <div className="flow-root w-full">
                    <ul className="steps w-full">
                        <li className={`step ${currentStep >= 1 ? 'step-primary' : ''}`}>Connect</li>
                        <li className={`step ${currentStep >= 2 ? 'step-primary' : ''}`}>Deploy</li>
                        <li className={`step ${currentStep >= 3 ? 'step-primary' : ''}`}>Invite</li>
                    </ul>

                    {
                        currentStep === 1 ? <SetupConnect /> :
                            currentStep === 2 ? <SetupDeploy /> :
                                currentStep === 3 ? <SetupInvite /> : null
                    }
                </div>
            </Layout>
            <ToastContainer position="top-center" autoClose={1000} />
        </>
    )
}