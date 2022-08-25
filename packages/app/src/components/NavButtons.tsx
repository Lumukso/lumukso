import {KeyIcon, LockClosedIcon} from "@heroicons/react/solid";
import {useNavigate} from "react-router-dom";

export function NavButtons(props) {
    const navigate = useNavigate();

    return (
        <div className={`grid grid-cols-2 gap-4 justify-items-stretch place-items-stretch items-center font-mono text-white font-bold leading-6 w-full h-full mb-2 ${props.className}`}>
            <button className="btn glass btn-block h-full rounded-lg flex-inline items-center justify-center bg-[#E685FC] hover:bg-[#E685FC] shadow-lg"
                    onClick={() => navigate('/setup')}>
                <LockClosedIcon className="h-4 w-4" />
                <div>Setup</div>
            </button>
            <button className="btn glass btn-block h-full rounded-lg flex items-center justify-center bg-[#6ECAFF] hover:bg-[#6ECAFF] shadow-lg"
                    onClick={() => navigate('/recover')}>
                <KeyIcon className="h-4 w-4" />
                <div>Recover</div>
            </button>
        </div>
    )
}