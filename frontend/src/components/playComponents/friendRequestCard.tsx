import { UserPlus, Loader2 } from "lucide-react";
import {
    useEffect,
    useState,
    type InputHTMLAttributes,
} from "react";
import type { TimeControl } from "./timeControl";

interface FriendRequestCardProps
    extends InputHTMLAttributes<HTMLInputElement> {
    selectedTimeControl: TimeControl;
    loading: boolean;
    error?: string;
    onSendRequest: (
        timeControl: TimeControl,
        username: string
    ) => void;
}

export default function FriendRequestCard({
    selectedTimeControl,
    loading,
    error,
    onSendRequest,
    ...props
}: FriendRequestCardProps) {

    const [active, setActive] = useState(false);
    const [username, setUsername] = useState("");

    useEffect(() => {
        setUsername(String(props.value ?? ""));
    }, [props.value]);

    return (
        <div
            onClick={() => setActive(true)}
            className={`
                rounded-3xl
                border
                p-8
                backdrop-blur-xl
                transition-all
                duration-300

                ${
                    active
                        ? "border-green-500/40 bg-[#171a21]"
                        : "border-white/10 bg-[#171a21]/60 opacity-70"
                }
            `}
        >

            <div className="flex items-center gap-3">

                <div className="rounded-full bg-green-500/10 p-3">
                    <UserPlus
                        size={26}
                        className="text-green-500"
                    />
                </div>

                <div>

                    <h2 className="text-2xl font-bold text-white">
                        Challenge a Friend
                    </h2>

                    <p className="mt-1 text-gray-400">
                        Invite a friend using their username.
                    </p>

                </div>

            </div>

            <div className="mt-8">

                <label className="mb-2 block font-medium text-white">
                    Friend Username
                </label>

                <input
                    {...props}
                    value={username}
                    onFocus={() => setActive(true)}
                    onChange={(e) => {
                        setUsername(e.target.value);

                        props.onChange?.(e);
                    }}
                    placeholder="Enter username"
                    className={`
                        w-full
                        rounded-2xl
                        bg-[#0f1115]
                        px-4
                        py-4
                        text-white
                        outline-none
                        transition

                        ${
                            error
                                ? "border border-red-500"
                                : "border border-white/10 focus:border-green-500"
                        }
                    `}
                />

                {error && (
                    <p className="mt-2 text-sm text-red-500">
                        {error}
                    </p>
                )}

            </div>

            <button
                type="button"
                disabled={loading}
                onClick={() =>
                    onSendRequest(
                        selectedTimeControl,
                        username
                    )
                }
                className="
                    mt-8
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-3
                    rounded-2xl
                    bg-green-500
                    py-4
                    text-lg
                    font-semibold
                    text-black
                    transition
                    hover:bg-green-400
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                "
            >

                {loading ? (
                    <>
                        <Loader2
                            className="animate-spin"
                            size={22}
                        />
                        Sending...
                    </>
                ) : (
                    <>
                        <UserPlus size={22} />
                        Send Request
                    </>
                )}

            </button>

        </div>
    );
}