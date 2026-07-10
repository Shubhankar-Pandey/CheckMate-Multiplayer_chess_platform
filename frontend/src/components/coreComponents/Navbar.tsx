import {
    ChessKnight,
    ChevronDown,
    History,
    LogOut,
} from "lucide-react";

import {
    useEffect,
    useRef,
    useState,
} from "react";

import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { signoutCall } from "../../apiCalls/auth";
import { resetUser } from "../../Redux/Slices/userSlice";





export default function Navbar() {

    const { user } = useSelector((state: any) => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showDropdown, setShowDropdown] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);

    //--------------------------------------------------
    // Close dropdown on outside click
    //--------------------------------------------------

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(
                    event.target as Node
                )
            ) 
            {
                setShowDropdown(false);
            }
        }

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);


    // --------------------------------------------------------------


    async function signoutHandler() {

        const toastId = toast.loading("Signing out...");

        try {
            const response = await signoutCall();

            if (response?.success) {
                toast.success(response.message);
                dispatch(resetUser());
                navigate("/");
            } 
            else {
                toast.error("Signout failed");
            }
        } 
        catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Something went wrong."
            );
        } 
        finally {
            toast.dismiss(toastId);
        }
    }

    //--------------------------------------------------

    return (
        <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0f1115]/95 backdrop-blur">

            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-8">

                {/* Logo */}

                <NavLink
                    to="/"
                    className="flex items-center gap-3"
                >
                    <ChessKnight
                        size={34}
                        className="text-green-500"
                    />

                    <h1 className="text-3xl font-bold text-white">
                        Check
                        <span className="text-green-500">
                            Mate
                        </span>
                    </h1>
                </NavLink>

                {/* Right */}

                <div className="flex items-center gap-8">

                    <button
                        className="
                            text-white
                            transition
                            hover:text-green-500
                        "
                    >
                        Features
                    </button>

                    <button
                        className="
                            text-white
                            transition
                            hover:text-green-500
                        "
                    >
                        About
                    </button>

                    {!user?.firstName ? (

                        <NavLink
                            to="/signin"
                            className="
                                rounded-xl
                                border
                                border-green-500
                                px-6
                                py-2
                                font-medium
                                text-white
                                transition
                                hover:bg-green-500
                                hover:text-black
                            "
                        >
                            Sign In
                        </NavLink>

                    ) : (

                        <div
                            ref={dropdownRef}
                            className="relative"
                        >

                            <button
                                onClick={() =>
                                    setShowDropdown(
                                        (prev) => !prev
                                    )
                                }
                                className="
                                    flex
                                    items-center
                                    gap-3
                                    rounded-xl
                                    px-3
                                    py-2
                                    transition
                                    hover:bg-white/5
                                "
                            >

                                {/* Avatar */}

                                <div
                                    className="
                                        flex
                                        h-10
                                        w-10
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-green-500
                                        font-bold
                                        text-black
                                    "
                                >
                                    {user.firstName
                                        .charAt(0)
                                        .toUpperCase()}
                                </div>

                                <span className="font-medium text-white">
                                    {user.firstName}
                                </span>

                                <ChevronDown
                                    size={18}
                                    className={`transition-transform duration-200 ${
                                        showDropdown
                                            ? "rotate-180"
                                            : ""
                                    }`}
                                />

                            </button>

                            {/* Dropdown */}

                            {showDropdown && (

                                <div
                                    className="
                                        absolute
                                        right-0
                                        mt-3
                                        w-64
                                        overflow-hidden
                                        rounded-2xl
                                        border
                                        border-white/10
                                        bg-[#171a21]
                                        shadow-2xl
                                    "
                                >

                                    {/* Header */}

                                    <div className="border-b border-white/10 p-5">

                                        <div className="flex items-center gap-3">

                                            <div
                                                className="
                                                    flex
                                                    h-12
                                                    w-12
                                                    items-center
                                                    justify-center
                                                    rounded-full
                                                    bg-green-500
                                                    text-lg
                                                    font-bold
                                                    text-black
                                                "
                                            >
                                                {user.firstName
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </div>

                                            <div>

                                                <p className="font-semibold text-white">
                                                    {user.firstName}
                                                </p>

                                                <p className="text-sm text-gray-400">
                                                    @{user.username}
                                                </p>

                                            </div>

                                        </div>

                                    </div>

                                    {/* History */}

                                    <button
                                        onClick={() => {

                                            setShowDropdown(
                                                false
                                            );

                                            // TODO:
                                            // Navigate to history

                                        }}
                                        className="
                                            flex
                                            w-full
                                            items-center
                                            gap-3
                                            px-5
                                            py-4
                                            text-left
                                            text-white
                                            transition
                                            hover:bg-white/5
                                        "
                                    >

                                        <History
                                            size={20}
                                        />

                                        Game History

                                    </button>

                                    {/* Logout */}

                                    <button
                                        onClick={() => {

                                            setShowDropdown(
                                                false
                                            );

                                            signoutHandler();

                                        }}
                                        className="
                                            flex
                                            w-full
                                            items-center
                                            gap-3
                                            px-5
                                            py-4
                                            text-left
                                            text-red-400
                                            transition
                                            hover:bg-red-500/10
                                        "
                                    >

                                        <LogOut
                                            size={20}
                                        />

                                        Logout

                                    </button>

                                </div>

                            )}

                        </div>

                    )}

                </div>

            </div>

        </nav>
    );
}