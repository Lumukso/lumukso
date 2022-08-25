import {Route, Routes} from "react-router-dom";
import {Home} from "./pages/Home";
import {Setup} from "./pages/Setup";
import {Recover} from "./pages/Recover";
import {MagicLogin} from "./pages/MagicLogin";

export function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/setup" element={<Setup />} />
            <Route path="/magic-login" element={<MagicLogin />} />
            <Route path="/recover" element={<Recover />} />
            <Route path="/recover/:socialRecoveryAddress" element={<Recover />} />
        </Routes>
    )
}