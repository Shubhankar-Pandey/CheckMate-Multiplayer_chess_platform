import type { Chess, Color, PieceSymbol, Square } from "chess.js";
import { useEffect, useState } from "react";
import { MOVE } from "../../screens/Game";
import { useSelector } from "react-redux";
import Clock from "./Clock";
import PawnPromotionModal from "./PawnPromotionModal";

const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const numbers : number[] = [8, 7, 6, 5, 4, 3, 2 ,1];

type SquareType = {
    square: Square;
    type: PieceSymbol;
    color: Color;
} | null;


export default function ChessBoard({socket, board, chess, color, opponent, time, turn, gameOver} : {
    board: SquareType[][];
    socket : WebSocket;
    chess : Chess;
    color : string;
    opponent : string;
    time : {whiteTime : number, blackTime : number};
    turn : string;
    gameOver : boolean;
}){

    const [from, setFrom] = useState<null | string>(null);
    const [possibleMoves, setPossibleMoves] = useState<string[]>([]);
    const [promotionPiece, setPromotionPiece] = useState<null | string>(null);
    const { user } = useSelector((state : any) => state.user);
    const [needsPromotion, setNeedsPromotion] = useState<boolean>(false);
    const [pendingMove, setPendingMove] = useState<{from: string, to: string} | null>(null);


    function onMoveHandler(i: number, j: number) {
        let row = 8 - i;
        let col = files[j];
        let position = `${col}${row}`;

        const clickedPiece = board[i][j];

        if (!from) {
            if (!clickedPiece || clickedPiece.color !== color || turn !== color) return;
            setFrom(position);

            const moves = chess.moves({ square: position as Square, verbose: true });
            setPossibleMoves(moves.map(move => move.to));
            return;
        }

        // second click: figure out what's actually being moved
        const movingPiece = chess.get(from as Square); // the pawn we picked up, not the destination
        const isPromotion =
            movingPiece?.type === "p" &&
            movingPiece.color === chess.turn() &&
            (movingPiece.color === "w" ? position.endsWith("8") : position.endsWith("1"));

        if (isPromotion) {
            // don't send yet — wait for the user to pick a piece
            setPendingMove({ from, to: position });
            setNeedsPromotion(true);
            return; 
        }

        socket.send(JSON.stringify({
            type: MOVE,
            payload: { from, to: position }
        }));
        setFrom(null);
        setPossibleMoves([]);
    }

    // fires once the modal sets a piece
    useEffect(() => {
        if (promotionPiece && pendingMove) {
            socket.send(JSON.stringify({
                type: MOVE,
                payload: {
                    from: pendingMove.from,
                    to: pendingMove.to,
                    promotion: promotionPiece,
                }
            }));
            setPromotionPiece(null);
            setPendingMove(null);
            setNeedsPromotion(false);
            setFrom(null);
            setPossibleMoves([]);
        }
    }, [promotionPiece, pendingMove]);



    return (
        <div className="relative flex flex-col">

            {/* username and clock   */}
            <div className="flex justify-between border border-zinc-700 p-1">
                <div className="px-3">{opponent}</div>
                {
                    color === "b" ? <Clock time = {time.whiteTime} turn = {turn} color = "w" gameOver = {gameOver}/> 
                    : <Clock time = {time.blackTime} turn = {turn} color = "b" gameOver = {gameOver}/>
                }
            </div>

            <div className="flex mt-1">
                {/* number markings */}
                <div className={`flex ${color === "b" ? "flex-col-reverse" : "flex-col"}`}>
                    {
                        numbers.map((num, index) => (
                            <div key={index} className= {`text-black font-bold text-sm w-6 h-16 flex items-center justify-center ${index & 1 ? "bg-blue-300" : "bg-blue-200"}`}>
                                {num}
                            </div>
                        ))
                    }
                </div>
                {/* board  */}
                <div className={`flex ${color === "b" ? "flex-col-reverse" : "flex-col"}`}>
                    {
                        board.map((row , i) => (
                            <div key={i} className="flex ">
                                {
                                    row.map((square, j) => {
                                        // derive the square name from indices, since empty
                                        // cells (square === null) have no .square field
                                        const cellSquare = `${files[j]}${8 - i}` as Square;
                                        const isPossibleMove = possibleMoves.includes(cellSquare);

                                        const piece = chess.get(cellSquare);
                                        const underCheck = chess.isCheck();
                                        const isKingInCheck = underCheck && piece?.type === "k" && turn === piece?.color;

                                        return (
                                            <div onClick={() => onMoveHandler(i,j)}
                                            key={j}
                                            className={`w-16 h-16
                                            ${  isKingInCheck ? "bg-red-500 border border-zinc-950"
                                                : isPossibleMove ? square === null ?
                                                                "bg-blue-500 border border-zinc-950" 
                                                                : "bg-red-500 border border-zinc-950"
                                                : from === cellSquare ? "bg-orange-400" 
                                                                : (i+j) % 2 === 0 ? "bg-green-700" 
                                                                                : "bg-green-100"}`
                                                    }>
                                                    <div className="text-black flex items-center justify-center w-full h-full">
                                                        {
                                                            square && (
                                                                <img
                                                                    src={`/${square.type}-${square.color}.svg`}
                                                                    alt={`${square.color} ${square.type}`}
                                                                />
                                                            )
                                                        }
                                                    </div>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        ))
                    }
                </div>
            </div>

            {/* files marking  */}
            <div className="flex items-center justify-center ml-6">
                {
                    files.map((file, index) => (
                        <div key={index} className={`text-black font-bold w-16 h-6 flex items-center justify-center text-sm ${index & 1 ? "bg-blue-300" : "bg-blue-200"}`}>
                            {file}
                        </div>
                    ))
                }
            </div>
            
            {/* username and clock   */}
            <div className="flex justify-between border border-zinc-700 p-1 mt-1">
                <div className="px-3">{user.username}</div>
                {
                    color === "w" ? <Clock time = {time.whiteTime} turn = {turn} color = "w" gameOver = {gameOver}/> 
                    : <Clock time = {time.blackTime} turn = {turn} color = "b" gameOver = {gameOver}/>
                }
            </div>
            {
                needsPromotion && <PawnPromotionModal setPromotionPiece={setPromotionPiece}/>
            }
        </div>
    )
}
