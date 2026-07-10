import type { Chess } from "chess.js";
import { useEffect, useRef } from "react";

export default function ShowMoves({ chess }: { chess: Chess }) {
    const history = chess.history();
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
        });
    }, [history.length]);

    const moves = [];

    for (let i = 0; i < history.length; i += 2) {
        moves.push({
            move: Math.floor(i / 2) + 1,
            white: history[i],
            black: history[i + 1] || "-",
        });
    }

    return (
        <div className="bg-black text-white px-4 py-5 rounded-3xl
         border border-zinc-700 flex flex-col w-full h-155">
            <div className="text-lg w-full rounded-md bg-green-500 p-2.5 text-center font-semibold">
                Moves Played
            </div>

            <div className="flex-1 overflow-y-auto mt-4 rounded-md border border-zinc-700">
                {/* Header */}
                <div className="grid grid-cols-3 bg-zinc-800 sticky top-0 z-10 font-semibold text-sm">
                    <div className="p-2 text-center">#</div>
                    <div className="p-2 text-center">White</div>
                    <div className="p-2 text-center">Black</div>
                </div>

                {/* Moves */}
                {moves.map((moveData) => (
                    <div
                        key={moveData.move}
                        className="grid grid-cols-3 border-t border-zinc-700 hover:bg-zinc-900 transition-colors text-sm"
                    >
                        <div className="p-2 text-center text-gray-400">
                            {moveData.move}
                        </div>

                        <div className="p-2 text-center truncate">
                            {moveData.white}
                        </div>

                        <div className="p-2 text-center truncate">
                            {moveData.black}
                        </div>
                    </div>
                ))}

                {/* Auto-scroll target */}
                <div ref={bottomRef} />
            </div>
        </div>
    );
}