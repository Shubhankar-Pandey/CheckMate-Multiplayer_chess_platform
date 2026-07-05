import type { InputHTMLAttributes } from "react";

interface AuthInputProps
    extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

export default function AuthInput({
    label,
    error,
    ...props
}: AuthInputProps) {
    return (
        <div className="space-y-2">
            <label className="text-white font-medium">
                {label}
            </label>

            <input
                {...props}
                className="w-full rounded-xl bg-[#0f1115] border border-white/10 px-4 py-3 text-white outline-none focus:border-green-500 transition"
            />

            {error && (
                <p className="text-red-400 text-sm">
                    {error}
                </p>
            )}
        </div>
    );
}