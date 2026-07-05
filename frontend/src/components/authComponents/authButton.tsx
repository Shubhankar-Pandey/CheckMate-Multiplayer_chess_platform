interface AuthButtonProps {
    text: string;
    loading?: boolean;
    loadingText?: string;
}

export default function AuthButton({
    text,
    loading = false,
    loadingText = "Loading...",
}: AuthButtonProps) {
    return (
        <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-green-500 py-3 font-semibold text-black transition duration-200 hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
            {loading ? loadingText : text}
        </button>
    );
}