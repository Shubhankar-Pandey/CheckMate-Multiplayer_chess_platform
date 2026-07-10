import { useState } from "react";
import Button from "../components/CommonComponents/Button";
import {
    Swords,
    UserPlus,
    Clock3,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export const TIME_CONTROLS = [
    {
        id: "TC_5_3",
        title: "5 | 3",
        description: "5 min • 3 sec increment",
    },
    {
        id: "TC_10_2",
        title: "10 | 2",
        description: "10 min • 2 sec increment",
    },
    {
        id: "TC_15_2",
        title: "15 | 2",
        description: "15 min • 2 sec increment",
    },
] as const;


type TimeControl = (typeof TIME_CONTROLS)[number]["id"];




export default function SelectGame() {

    const [selectedTC, setSelectedTC] = useState<TimeControl>("TC_5_3");
    const [friendUsername, setFriendUsername] = useState("");
    const navigate = useNavigate();



    const handleStartPlay = () => {
        navigate("/game", {
            state : {
                selectedTC : selectedTC
            }
        })
    };



    const handleRequestFriend = () => {
        // TODO:
    };



    return (

        <div className="min-h-screen bg-[#0f1115] text-white">

            <div className="mx-auto flex h-full max-w-7xl flex-col px-8 py-8">

                {/* Heading */}

                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold">
                        Choose How You{" "}
                        <span className="text-green-500">
                            Want To Play
                        </span>
                    </h1>
                    <p className="mt-2 text-gray-400">
                        Select a time control and
                        start a new game.
                    </p>
                </div>

                {/* Time Controls */}

                <div>
                    <p className="mb-4 text-lg font-semibold">
                        Time Control
                    </p>
                    <div className="grid grid-cols-3 gap-4">

                        {TIME_CONTROLS.map((tc) => (
                            <button
                                key={tc.id}
                                onClick={() =>
                                    setSelectedTC(tc.id)
                                }
                                className={` rounded-2xl border p-4 text-left transition-all duration-300
                                    ${
                                        selectedTC === tc.id
                                            ? "border-green-500 bg-green-500/10"
                                            : "border-white/10 bg-[#171a21] hover:border-green-500/50"
                                    }
                                `}
                            >

                                <div className="flex items-center gap-3">
                                    <div
                                        className={` flex h-10 w-10 items-center justify-center rounded-full
                                            ${
                                                selectedTC ===
                                                tc.id
                                                    ? "bg-green-500 text-black"
                                                    : "bg-[#0f1115] text-green-500"
                                            }
                                        `}
                                    >
                                        <Clock3 size={18} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold">
                                            {tc.title}
                                        </h3>
                                        <p className="text-xs text-gray-400">
                                            {tc.description}
                                        </p>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Bottom Cards */}

                <div className="mt-8 grid flex-1 grid-cols-2 gap-8">
                    {/* Random Match */}
                    <div
                        className=" flex flex-col justify-between rounded-3xl border  border-white/10 bg-[#171a21] p-6 "
                    >
                        <div>
                            <div className="flex items-center gap-3">
                                <div className="rounded-full bg-green-500/10 p-3">
                                    <Swords className="text-green-500"
                                        size={24}
                                    />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold">
                                        Random Match
                                    </h2>
                                    <p className="mt-1 text-gray-400">
                                        Find an opponent instantly.
                                    </p>
                                </div>
                            </div>
                            <div className="mt-8 rounded-2xl bg-black/40 p-5">
                                <p className="text-sm text-gray-400">
                                    Selected Time Control
                                </p>
                                <p className="mt-2 text-3xl font-bold text-green-500">
                                    {
                                        TIME_CONTROLS.find(
                                            (tc) =>
                                                tc.id ===
                                                selectedTC
                                        )?.title
                                    }
                                </p>
                            </div>
                        </div>

                        <Button
                            onClick={handleStartPlay}
                            text="Play Now"
                        />

                    </div>



                    {/* Friend Match */}
                    <div
                        className=" flex flex-col justify-between rounded-3xl border  border-white/10 bg-[#171a21] p-6"
                    >
                        <div>
                            <div className="flex items-center gap-3">
                                <div className="rounded-full bg-green-500/10 p-3">
                                    <UserPlus
                                        className="text-green-500"
                                        size={24}
                                    />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold">
                                        Play With Friend
                                    </h2>
                                    <p className="mt-1 text-gray-400">
                                        Invite your friend using
                                        their username.
                                    </p>
                                </div>
                            </div>
                            <div className="mt-8">
                                <label className="mb-2 block text-sm text-gray-300">
                                    Friend Username
                                </label>
                                <input
                                    value={friendUsername}
                                    onChange={(e) =>
                                        setFriendUsername(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Enter username..."
                                    className=" w-full rounded-xl border  border-white/10 bg-[#0f1115] px-4 py-3 outline-none transition  focus:border-green-500 "
                                />
                            </div>
                        </div>

                        <Button
                            onClick={handleRequestFriend}
                            text="Send Request"
                        />
                    </div>
                </div>
            </div>
        </div>
    );

}