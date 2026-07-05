import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Gamepad2 } from "lucide-react";

import {
    TIME_CONTROLS,
    type TimeControl,
} from "../components/playComponents/timeControl";

import TimeControlCard from "../components/playComponents/timeControlCard";
import RandomMatchCard from "../components/playComponents/randomMatchCard";
import FriendRequestCard from "../components/playComponents/friendRequestCard";

interface FriendRequestForm {
    username: string;
}

export default function SelectGame() {
    const [selectedTimeControl, setSelectedTimeControl] =
        useState<TimeControl>("TC_10_2");

    const [randomLoading, setRandomLoading] =
        useState(false);

    const [friendLoading, setFriendLoading] =
        useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<FriendRequestForm>();

    const username = watch("username");

    //--------------------------------------------------
    // Random Match
    //--------------------------------------------------

    const handleStartGame = async (
        timeControl: TimeControl
    ) => {

        if (randomLoading) return;

        setRandomLoading(true);

        try {

            // TODO:
            // WebSocket matchmaking

            console.log(timeControl);

            toast.success("Searching for opponent...");

        } catch {

            toast.error("Unable to start matchmaking.");

        } finally {

            setRandomLoading(false);

        }
    };

    //--------------------------------------------------
    // Friend Request
    //--------------------------------------------------

    const handleSendRequestToFriend = async (
        timeControl: TimeControl,
        username: string
    ) => {

        if (friendLoading) return;

        setFriendLoading(true);

        try {

            // TODO:
            // Send request through websocket

            console.log(timeControl);
            console.log(username);

            toast.success("Friend request sent.");

        } catch {

            toast.error("Unable to send request.");

        } finally {

            setFriendLoading(false);

        }
    };

    return (
        <div className="min-h-screen bg-[#0f1115] px-6 py-12">

            <div className="mx-auto max-w-7xl">

                {/* Heading */}

                <div className="mb-14 text-center">

                    <div className="inline-flex items-center gap-3 rounded-full border border-green-500/30 bg-green-500/10 px-5 py-2">

                        <Gamepad2
                            className="text-green-500"
                            size={20}
                        />

                        <span className="font-semibold text-green-500">
                            PLAY CHESS
                        </span>

                    </div>

                    <h1 className="mt-6 text-5xl font-bold text-white">
                        Choose How You{" "}
                        <span className="text-green-500">
                            Want To Play
                        </span>
                    </h1>

                    <p className="mt-4 text-lg text-gray-400">
                        Select a time control and start a game.
                    </p>

                </div>

                {/* Time Controls */}

                <section>

                    <h2 className="mb-6 text-2xl font-bold text-white">
                        Select Time Control
                    </h2>

                    <div className="grid gap-6 md:grid-cols-3">

                        {TIME_CONTROLS.map((timeControl) => (

                            <TimeControlCard
                                key={timeControl.id}
                                id={timeControl.id}
                                title={timeControl.title}
                                description={timeControl.description}
                                selected={
                                    selectedTimeControl ===
                                    timeControl.id
                                }
                                onClick={
                                    setSelectedTimeControl
                                }
                            />

                        ))}

                    </div>

                </section>

                {/* Cards */}

                <section className="mt-12">

                    <div className="grid gap-8 lg:grid-cols-2">

                        <RandomMatchCard
                            selectedTimeControl={
                                selectedTimeControl
                            }
                            loading={randomLoading}
                            onStartGame={
                                handleStartGame
                            }
                        />

                        <form
                            onSubmit={handleSubmit(() =>
                                handleSendRequestToFriend(
                                    selectedTimeControl,
                                    username
                                )
                            )}
                        >

                            <FriendRequestCard
                                selectedTimeControl={
                                    selectedTimeControl
                                }
                                loading={friendLoading}
                                error={
                                    errors.username?.message
                                }
                                onSendRequest={
                                    handleSendRequestToFriend
                                }
                                {...register("username", {
                                    required:
                                        "Friend username is required",
                                })}
                            />

                        </form>

                    </div>

                </section>

            </div>

        </div>
    );
}