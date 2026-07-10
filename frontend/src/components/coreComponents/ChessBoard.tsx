import type { Chess, Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
import { MOVE } from "../../screens/Game";
import { useSelector } from "react-redux";

const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const numbers : number[] = [8, 7, 6, 5, 4, 3, 2 ,1];

type SquareType = {
    square: Square;
    type: PieceSymbol;
    color: Color;
} | null;


export default function ChessBoard({socket, board, chess, color, opponent} : {
    board: SquareType[][];
    socket : WebSocket;
    chess : Chess;
    color : string;
    opponent : string;
}){

    const [from, setFrom] = useState<null | string>(null);
    const [possibleMoves, setPossibleMoves] = useState<string[]>([]);
    const { user } = useSelector((state : any) => state.user);

    function onMoveHandler(i : number,j : number, square : SquareType){
        let row = 8 - i;
        let col = files[j];
        let position = `${col}${row}`;

        if(!from){
            const piece = board[i][j];
            if (!piece) return;
            setFrom(position);

            if(square){
                const moves = chess.moves({ square: square.square, verbose: true });
                const arr: string[] = moves.map(move => move.to);
                setPossibleMoves(arr);
            }
        }
        else{
            socket.send(JSON.stringify({
                type : MOVE,
                payload : {
                    from,
                    to : position,
                }
            }))
            setFrom(null);
            setPossibleMoves([]);
        }
    }

    return (
        <div className="flex flex-col">
            <div className="flex justify-between border border-zinc-700 p-1">
                <div className="px-3">{opponent}</div>
                <div className="px-3">Clock</div>
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
                                        const cellSquare = `${files[j]}${8 - i}`;
                                        const isPossibleMove = possibleMoves.includes(cellSquare);

                                        return (
                                            <div onClick={() => onMoveHandler(i,j, square)}
                                            key={j}
                                            className={`w-16 h-16
                                            ${isPossibleMove ? "bg-blue-500 border border-zinc-950" : (i+j) % 2 === 0 ? "bg-green-700" : "bg-green-100"}`}>
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
            <div className="flex items-center justify-center ml-6">
                {
                    files.map((file, index) => (
                        <div key={index} className={`text-black font-bold w-16 h-6 flex items-center justify-center text-sm ${index & 1 ? "bg-blue-300" : "bg-blue-200"}`}>
                            {file}
                        </div>
                    ))
                }
            </div>
            <div className="flex justify-between border border-zinc-700 p-1 mt-1">
                <div className="px-3">{user.username}</div>
                <div className="px-3">Clock</div>
            </div>
        </div>
    )
}
