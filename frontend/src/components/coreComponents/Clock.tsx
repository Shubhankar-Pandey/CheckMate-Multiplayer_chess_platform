import { useEffect, useRef, useState } from "react";

export default function Clock({ time, turn, color }: { time: number; turn: string; color: string;}) {
    const [remainingMs, setRemainingMs] = useState<number>(time);
    const intervalRef = useRef<number | null>(null);

    // resync from the authoritative server value whenever a new one arrives
    useEffect(() => {
        setRemainingMs(time);
    }, [time]);

    const isRunning = color === turn;

    useEffect(() => {
        if (!isRunning) {
            if (intervalRef.current !== null) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
            return;
        }

        intervalRef.current = window.setInterval(() => {
            setRemainingMs(prev => Math.max(prev - 1000, 0));
        }, 1000);

        return () => {
            if (intervalRef.current !== null) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isRunning]);

    const totalSeconds = Math.max(Math.floor(remainingMs / 1000), 0);
    const minute = Math.floor(totalSeconds / 60);
    const second = totalSeconds % 60;
    const pad = (n : number) => (n <= 9 ? "0" + n : String(n));

    return (
        <div className="px-3 flex gap-x-1">
            <div>{pad(minute)}</div>
            <div> : </div>
            <div>{pad(second)}</div>
        </div>
    );
}