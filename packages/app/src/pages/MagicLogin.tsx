import {useEffect, useRef} from "react";
import {MoonLoader} from "react-spinners";

export function MagicLogin() {
    const rootEl = useRef(null);

    useEffect(() => {
        const script = document.createElement('script');

        script.src = "https://auth.magic.link/pnp/login";
        script.async = true;
        script.setAttribute("data-magic-publishable-api-key", import.meta.env.VITE_MAGIC_KEY);
        script.setAttribute("data-redirect-uri", "/");

        rootEl.current.appendChild(script);

        return () => {
            rootEl.current.removeChild(script);
        }
    }, []);

    return (
        <div ref={rootEl} className="flex h-screen justify-center py-12 px-4 sm:px-6 lg:px-8">
            <MoonLoader color="#C15DFFFF" className="mt-[10rem]" />
        </div>
    )
}
