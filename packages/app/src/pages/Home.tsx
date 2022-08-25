import {Layout} from "./Layout";
import {useUp} from "../hooks/up";
import {NavButtons} from "../components/NavButtons";

export function Home() {
    useUp();
    return (
        <Layout>
            <NavButtons />
        </Layout>
    )
}