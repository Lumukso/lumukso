import {Layout} from "./Layout";
import {useUp} from "../hooks/up";
import {useNavigate} from "react-router-dom";
import {NavButtons} from "../components/NavButtons";

export function Home() {
    useUp();
    const navigate = useNavigate();

    return (
        <Layout>
            <NavButtons />
        </Layout>
    )
}