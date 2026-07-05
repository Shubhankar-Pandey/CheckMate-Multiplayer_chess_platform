import { Eye, EyeOff } from "lucide-react";
import {
    useState,
    type InputHTMLAttributes,
} from "react";

interface PasswordInputProps
    extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

export default function PasswordInput({
    label,
    error,
    ...props
}: PasswordInputProps) {
    const [showPassword, setShowPassword] =
        useState(false);

    return (
        <div className="space-y-2">
            <label className="text-white font-medium">
                {label}
            </label>

            <div className="relative">
                <input
                    {...props}
                    type={showPassword ? "text" : "password"}
                    className="w-full rounded-xl bg-[#0f1115] border border-white/10 px-4 py-3 pr-12 text-white outline-none focus:border-green-500 transition"
                />

                <button
                    type="button"
                    onClick={() =>
                        setShowPassword(!showPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                    {showPassword ? (
                        <EyeOff size={20} />
                    ) : (
                        <Eye size={20} />
                    )}
                </button>
            </div>

            {error && (
                <p className="text-red-400 text-sm">
                    {error}
                </p>
            )}
        </div>
    );
}