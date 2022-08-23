import {Route, Routes} from "react-router-dom";
import {Home} from "./pages/Home";
import {MagicLogin} from "./pages/MagicLogin";

export function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/magic-login" element={<MagicLogin />} />
            <Route path="/web3auth-login" element={<></>} />
            <Route path="/recover" element={<></>} />
        </Routes>
    )
}