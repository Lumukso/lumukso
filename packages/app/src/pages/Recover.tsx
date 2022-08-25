import {Layout} from "./Layout";
import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";

const ADDRESS_PARAM = "socialRecoveryAddress";

export function Recover() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [socialRecoveryAddress, setSocialRecoveryAddress] = useState<string | null>(null);

    useEffect(() => {
        if (searchParams.has(ADDRESS_PARAM)) {
            setSocialRecoveryAddress(searchParams.get(ADDRESS_PARAM))
        }
    }, []);

    useEffect(() => {
        // do something
    }, [socialRecoveryAddress]);

    return (
        <Layout>
        </Layout>
    )
}