import type { ReactNode } from "react";

interface AuthLayoutProps {
    title: string;
    subtitle: string;
    children: ReactNode;
}

export default function AuthLayout({
    title,
    subtitle,
    children,
}: AuthLayoutProps) {
    return (
        <div className="min-h-screen bg-[#0f1115] flex items-center justify-center px-6 py-12">
            {/* Background Glow */}
            <div className="absolute h-96 w-96 rounded-full bg-green-500/10 blur-[160px]" />

            <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-[#171a21]/80 backdrop-blur-xl p-8 shadow-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white">
                        Check<span className="text-green-500">Mate</span>
                    </h1>

                    <h2 className="text-2xl font-semibold text-white mt-8">
                        {title}
                    </h2>

                    <p className="text-gray-400 mt-2">
                        {subtitle}
                    </p>
                </div>

                {children}
            </div>
        </div>
    );
}