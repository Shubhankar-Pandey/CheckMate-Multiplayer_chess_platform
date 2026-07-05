import { Clock3 } from "lucide-react";
import type { TimeControl } from "./timeControl";  

interface TimeControlCardProps {
    id: TimeControl;
    title: string;
    description: string;
    selected: boolean;
    onClick: (timeControl: TimeControl) => void;
}

export default function TimeControlCard({
    id,
    title,
    description,
    selected,
    onClick,
}: TimeControlCardProps) {
    return (
        <button
            type="button"
            onClick={() => onClick(id)}
            className={`
                group w-full rounded-2xl border p-5 transition-all duration-300 text-left
                ${
                    selected
                        ? "border-green-500 bg-green-500/10 shadow-[0_0_30px_rgba(34,197,94,0.25)]"
                        : "border-white/10 bg-[#171a21] hover:border-green-500/50 hover:-translate-y-1"
                }
            `}
        >
            <div className="flex items-center gap-4">

                <div
                    className={`
                        flex h-14 w-14 items-center justify-center rounded-full transition
                        ${
                            selected
                                ? "bg-green-500 text-black"
                                : "bg-[#0f1115] text-green-500 group-hover:bg-green-500/10"
                        }
                    `}
                >
                    <Clock3 size={24} />
                </div>

                <div>
                    <h3 className="text-xl font-bold text-white">
                        {title}
                    </h3>

                    <p className="mt-1 text-sm text-gray-400">
                        {description}
                    </p>
                </div>

            </div>
        </button>
    );
}