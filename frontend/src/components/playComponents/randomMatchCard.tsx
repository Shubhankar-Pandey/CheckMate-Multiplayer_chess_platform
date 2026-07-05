import { Loader2, Sword } from "lucide-react";
import type { TimeControl } from "./timeControl";

interface RandomMatchCardProps {
    selectedTimeControl: TimeControl;
    loading: boolean;
    onStartGame: (timeControl: TimeControl) => void;
}

export default function RandomMatchCard({
    selectedTimeControl,
    loading,
    onStartGame,
}: RandomMatchCardProps) {
    return (
        <div className="rounded-3xl border border-white/10 bg-[#171a21]/80 backdrop-blur-xl p-8 transition-all">

            <div className="flex items-center gap-3">
                <div className="rounded-full bg-green-500/10 p-3">
                    <Sword
                        size={26}
                        className="text-green-500"
                    />
                </div>

                <div>
                    <h2 className="text-2xl font-bold text-white">
                        Random Match
                    </h2>

                    <p className="mt-1 text-gray-400">
                        Find an opponent instantly with the
                        selected time control.
                    </p>
                </div>
            </div>

            <div className="mt-8 rounded-2xl border border-green-500/20 bg-green-500/5 p-5">

                <p className="text-sm text-gray-400">
                    Selected Time Control
                </p>

                <p className="mt-2 text-2xl font-bold text-green-500">
                    {selectedTimeControl.replaceAll("_", " ")}
                </p>

            </div>

            <button
                type="button"
                disabled={loading}
                onClick={() =>
                    onStartGame(selectedTimeControl)
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
                    duration-300
                    hover:bg-green-400
                    disabled:cursor-not-allowed
                    disabled:opacity-70
                "
            >
                {loading ? (
                    <>
                        <Loader2
                            className="animate-spin"
                            size={22}
                        />
                        Searching...
                    </>
                ) : (
                    <>
                        <Sword size={22} />
                        Play Now
                    </>
                )}
            </button>
        </div>
    );
}