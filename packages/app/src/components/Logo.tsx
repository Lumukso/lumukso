import logo from "/assets/logo.png";

export default function Logo({className}) {
    return (
        <div className={className || ""}>
            <div className="mx-auto w-full text-center h-full flex justify-center content-center items-center">
                <img src={logo} className="h-12" />
                <h1 className="text-4xl font-['Krona_One'] logo">LUMUKSO</h1>
            </div>
        </div>
    )
}