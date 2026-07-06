
import ChessBoard from "../components/coreComponents/ChessBoard"
import Button from "../components/utilComponents/Button"
import { useSocket } from "../hooks/useSocket"
import { useEffect, useState } from "react";
import { Chess } from "chess.js";
import toast from "react-hot-toast";
import ShowMoves from "../components/coreComponents/ShowMoves";

// TODO : Move together, there code repetition here
export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over"; 


export default function Game(){

    const [chess, setChess] = useState(new Chess()); // give some intial value
    const [board, setBoard] = useState(chess.board()) // give some initial value, this is what showing on the screen, initial board
    const [started, setStarted] = useState(false);
    const [color, setColor] = useState<string>("")


    const socket = useSocket();

    useEffect(() => {
        if(!socket){
            return;
        }
        // on receiving some message from ws backend server
        socket.onmessage = (event) => {

            const message = JSON.parse(event.data);

            switch(message.type) {
                case INIT_GAME :
                    const newChess = new Chess(); 
                    setChess(newChess);
                    setBoard(newChess.board());
                    setStarted(true);
                    console.log("Game Initialized you are ", message.payload.color);
                    setColor(message.payload.color)
                    toast.success(`You are ${message.payload.color}`);
                    break;
                case GAME_OVER : 
                    console.log("Game over")
                    break;
                case MOVE : 
                    chess.move(message.payload);       // mutate the existing instance
                    setChess(chess);                   // won't trigger re-render (same ref)
                    setBoard([...chess.board()]);      // spread to create new ref → forces re-render
                    break;
            }
        }
    }, [socket, chess])

    if(!socket){
        return (
            <div>
                Loading...
            </div>
        )
    }

    return (
        <div className="text-white p-16 bg-black/80">
            <div className="flex gap-x-20 justify-center">
                <div className="h-full">
                    <ChessBoard socket = {socket} board = {board} chess = {chess} color = {color}/>
                </div>
                <div>
                    { 
                        !started ? 
                        <Button onClick={() => {
                                socket.send(JSON.stringify({
                                    type : INIT_GAME,
                                    timeControl : "TC_5_3",
                                }))
                            }} text={"Play Online"}/>
                        :
                        (<div className="w-full p-3">
                            <ShowMoves chess = {chess}/>
                        </div>)
                    }
                </div>
            </div>
        </div>
    )
}