import {Route, Routes} from "react-router-dom";
import {Home} from "./pages/Home";
import {Setup} from "./pages/Setup";
import {Recover} from "./pages/Recover";
import {MagicLogin} from "./pages/MagicLogin";
import {ConfirmInvitation} from "./pages/ConfirmInvitation";
import {VoteToRecover} from "./pages/VoteToRecover";
import {PendingInvitations} from "./pages/PendingInvitations";
import {ToastContainer} from "react-toastify";

export function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/setup" element={<Setup/>}/>
                <Route path="/magic-login" element={<MagicLogin/>}/>
                <Route path="/pending" element={<PendingInvitations/>}/>
                <Route path="/confirm/:universalProfileAddress/:pendingGuardianAddress" element={<ConfirmInvitation/>}/>
                <Route path="/recover" element={<Recover/>}/>
                <Route path="/recover/:universalProfileAddress" element={<Recover/>}/>
                <Route path="/recover/:universalProfileAddress/vote/:newOwnerAddress" element={<VoteToRecover/>}/>
            </Routes>
            <ToastContainer position="top-center" autoClose={1000} />
        </>
    )
}