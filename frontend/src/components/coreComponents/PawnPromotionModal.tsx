export default function PawnPromotionModal({ setPromotionPiece }: any) {

    function setPieceHandler(piece: string) {
        setPromotionPiece(piece);
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs">
            <div className="flex gap-x-3 p-4 bg-slate-900 rounded-2xl shadow-xl">
                <button onClick={() => setPieceHandler("q")}
                    className="border border-zinc-700 rounded-lg p-2 px-4 text-white hover:bg-zinc-800 hover:scale-95 transition">
                    Queen
                </button>

                <button onClick={() => setPieceHandler("r")}
                    className="border border-zinc-700 rounded-lg p-2 px-4 text-white hover:bg-zinc-800 hover:scale-95 transition">
                    Rook
                </button>

                <button onClick={() => setPieceHandler("b")}
                    className="border border-zinc-700 rounded-lg p-2 px-4 text-white hover:bg-zinc-800 hover:scale-95 transition">
                    Bishop
                </button>

                <button onClick={() => setPieceHandler("n")}
                    className="border border-zinc-700 rounded-lg p-2 px-4 text-white hover:bg-zinc-800 hover:scale-95 transition">
                    Knight
                </button>
            </div>
        </div>
    )
}