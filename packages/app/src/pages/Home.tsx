import {Layout} from "./Layout";
import {useUp} from "../hooks/up";
import {NavButtons} from "../components/NavButtons";
import {useSocialRecovery} from "../hooks/lumukso";

export function Home() {
    useUp();
    useSocialRecovery();
    return (
        <Layout>
            <NavButtons />
        </Layout>
    )
}