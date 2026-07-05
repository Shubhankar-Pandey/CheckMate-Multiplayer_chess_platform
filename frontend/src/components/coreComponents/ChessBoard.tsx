import type { Chess, Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
import { MOVE } from "../../screens/Game";

const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const numbers : number[] = [8, 7, 6, 5, 4, 3, 2 ,1];

type SquareType = {
    square: Square;
    type: PieceSymbol;
    color: Color;
} | null;


export default function ChessBoard({socket, board, chess, color} : {
    board: SquareType[][];
    socket : WebSocket;
    chess : Chess;
    color : string;
}){

    const [from, setFrom] = useState<null | string>(null);
    const [possibleMoves, setPossibleMoves] = useState<string[]>([]);

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
            <div className="text-white text-2xl uppercase">
                {color}
            </div>
            <div className="flex">
                {/* number markings */}
                <div className={`flex ${color === "black" ? "flex-col-reverse" : "flex-col"}`}>
                    {
                        numbers.map((num, index) => (
                            <div key={index} className="w-16 h-16 flex items-center justify-center text-xl">
                                {num}
                            </div>
                        ))
                    }
                </div>
                {/* board  */}
                <div className={`flex ${color === "black" ? "flex-col-reverse" : "flex-col"}`}>
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
                                            ${isPossibleMove ? "bg-blue-300 border-2 border-blue-600" : (i+j) % 2 === 0 ? "bg-green-700" : "bg-green-100"}`}>
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
            <div className="flex items-center justify-center ml-16">
                {
                    files.map((file, index) => (
                        <div key={index} className="w-16 h-16 flex items-center justify-center text-xl">
                            {file}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
