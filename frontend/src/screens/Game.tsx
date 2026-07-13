import ChessBoard from "../components/coreComponents/ChessBoard"
import { useSocket } from "../hooks/useSocket"
import { useEffect, useState } from "react";
import { Chess } from "chess.js";
import toast from "react-hot-toast";
import ShowMoves from "../components/coreComponents/ShowMoves";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";


export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";

export const FRIEND_REQUEST = "friend_request";


export default function Game(){

    const [chess, setChess] = useState(new Chess());
    const [board, setBoard] = useState(chess.board());
    const [color, setColor] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [opponent, setOpponent] = useState<string>("");
    const [time, setTime] = useState<{whiteTime : number, blackTime : number}>({whiteTime : 0, blackTime : 0});
    const [turn, setTurn] = useState<string>("");

    const socket = useSocket();
    const location = useLocation();

    const { selectedTC } = location.state;
    const { user } = useSelector((state : any) => state.user);

    useEffect(() => {
        if(!socket){
            return;
        }

        setLoading(true);

        try{
            const message = {
                type: INIT_GAME,
                timeControl: selectedTC,
                username : user.username
            }
            socket.send(JSON.stringify(message));
        }
        catch(error){
            console.log(error);
            toast.error("Error in connection to ws");
        }
    }, [socket, user])



    useEffect(() => {
        if(!socket){
            return;
        }
        socket.onmessage = (event) => {

            const message = JSON.parse(event.data);
            console.log("message = ", message);

            switch(message.type) {
                case INIT_GAME :
                    const newChess = new Chess();
                    setChess(newChess);
                    setBoard(newChess.board());
                    setColor(message.payload.color)
                    toast.success(`You are ${message.payload.color === 'b' ? "Black" : "White"}`);
                    setLoading(false);
                    setOpponent(message.payload.opponent);
                    setTime({whiteTime : message.time.whiteTime, blackTime : message.time.blackTime})
                    setTurn(message.turn);
                    break;
                case GAME_OVER :
                    toast.success("Game over");
                    // TODO on game over
                    break;
                case MOVE :
                    chess.move(message.payload);
                    setChess(chess);
                    setBoard([...chess.board()]);
                    setTime({whiteTime : message.time.whiteTime, blackTime : message.time.blackTime})
                    setTurn(message.turn);
                    break;
            }
        }
    }, [socket, chess])


    if(loading){
        return (
            <div className="w-screen h-screen flex flex-col items-center justify-center bg-black">
                <div className="loader"></div>
            </div>
        )
    }

    return (
        <div className="text-white py-3 px-3 bg-black/80 max-h-screen w-full">

            <div className="flex items-start gap-x-6 justify-between">

                {/* LEFT: player panel — fixed width, stretches to board height via default flex stretch */}
                <div className="w-[23%] shrink-0">
                    {/* players name  */}
                    <div className="border border-zinc-700 rounded-2xl p-3 w-full
                        flex flex-col items-center justify-center gap-y-2 bg-black">
                        <div className="text-lg font-semibold text-center flex gap-x-2">
                            <p> {user.username} </p>
                            <p> {color === "w" ? "White" : "Black"} </p>
                        </div>
                        <div className="text-zinc-500 text-sm">vs</div>
                        <div className="text-lg font-semibold text-center text-zinc-400 flex gap-x-2">
                            <p> {opponent} </p>
                            <p> {color === "w" ? "Black" : "White"} </p>
                        </div>
                    </div>
                    {/* messaging box  */}
                    <div className="border border-zinc-700 rounded-2xl p-2 flex flex-col mt-3 w-full bg-black gap-y-2">
                        <div className="py-2 px-1 rounded-md text-center bg-zinc-900 border border-zinc-700">
                            <p className="font-bold">Chat Box</p>
                        </div>
                        <div className="border border-zinc-700 bg-zinc-900 py-4 px-2 rounded-2xl h-96">
                            Messages
                        </div>

                        <div className="flex gap-x-2"> 
                            <input type="text" placeholder="Message"
                                className="rounded-xl w-[80%] border border-zinc-700 px-2"/>
                            
                            <button className="bg-black py-1 px-2 border border-green-500 rounded-xl 
                                hover:text-black hover:bg-green-500 font-bold"> 
                                Send
                            </button>
                        </div>
                    </div>
                </div>

                {/* MIDDLE: board — no h-full here, let it define the row's natural height */}
                <div className="aspect-square py-3 px-5 rounded-2xl bg-black h-fit">
                    <ChessBoard
                        socket={socket as WebSocket}
                        board={board}
                        chess={chess}
                        color={color || "white"}
                        opponent = {opponent}
                        time = {time}
                        turn = {turn}
                    />
                </div>

                {/* RIGHT: moves list — fixed width, stretches via default flex stretch */}
                <div className="w-[23%]">
                    <ShowMoves chess={chess} />
                </div>

            </div>

        </div>
    )
}