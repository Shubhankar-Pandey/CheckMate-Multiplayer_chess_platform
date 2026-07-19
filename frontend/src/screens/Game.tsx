import ChessBoard from "../components/coreComponents/ChessBoard"
import { useSocket } from "../hooks/useSocket"
import { useEffect, useRef, useState } from "react";
import { Chess } from "chess.js";
import toast from "react-hot-toast";
import ShowMoves from "../components/coreComponents/ShowMoves";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../Redux/Slices/messageSlice";
import { Flag, Handshake  } from 'lucide-react';
import ConfirmationModal from "../components/CommonComponents/ConfirmationModal";



export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";
export const CHAT = "chat";
export const RESIGN = "resign";
export const DRAW = "draw";
export const DRAW_RESPONSE = "drawResponse"
export const FRIEND_REQUEST = "friend_request";
export const REGINATION = "Regination";
export const DRAW_OFFER = "Draw offer";



export default function Game(){

    const [chess, setChess] = useState(new Chess());
    const [board, setBoard] = useState(chess.board());
    const [color, setColor] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [opponent, setOpponent] = useState<string>("");
    const [time, setTime] = useState<{whiteTime : number, blackTime : number}>({whiteTime : 0, blackTime : 0});
    const [turn, setTurn] = useState<string>("");
    const [gameOver, setGameOver] = useState<boolean>(false);

    const socket = useSocket();
    const location = useLocation();
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const { selectedTC } = location.state;
    const { user } = useSelector((state : any) => state.user);
    const { messages } = useSelector((state : any) => state.message);
    const dispatch = useDispatch();

    interface modalInterface {
        text : string, 
        button1Text : string, 
        button2Text : string,
        button1Handler : () => void,
        button2Handler : () => void,
    }
    const [modalData, setModalData] = useState<modalInterface | null>(null);





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
    }, [socket])



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
                    if(message.payload.reason === REGINATION){
                        if(user.username === message.payload.winner){
                            setModalData({
                                text : "You won by opponent regination",
                                button1Text : "New Game",
                                button2Text : "Games history",
                                button1Handler : () => {
                                    navigate("/selectGame");
                                    setModalData(null);
                                },
                                button2Handler : () => {
                                    navigate("/");
                                    setModalData(null);
                                }
                            })
                        }
                        else{
                            setModalData({
                                text : "You loose by regination",
                                button1Text : "New Game",
                                button2Text : "Games history",
                                button1Handler : () => {
                                    navigate("/selectGame");
                                    setModalData(null);
                                },
                                button2Handler : () => {
                                    navigate("/");
                                    setModalData(null);
                                }
                            })
                        }
                    }
                    else if(message.payload.reason === DRAW_OFFER){
                        setModalData({
                            text : "Game Draw",
                            button1Text : "New Game",
                            button2Text : "Games history",
                            button1Handler : () => {
                                navigate("/selectGame");
                                setModalData(null);
                            },
                            button2Handler : () => {
                                navigate("/");
                                setModalData(null);
                            }
                        })
                    }
                    else{
                        chess.move(message.payload.move);
                        setChess(chess);
                        setBoard([...chess.board()]);
                        setTurn(message.payload.turn);
                        let text = "";
                        if(message.payload.reason === "checkmate"){
                            const winner = chess.turn() === color;
                            if(winner){
                                text = "You won by checkmate";
                            }
                            else{
                                text = "You loose by checkmate";
                            }
                        }
                        else{
                            text = `${message.payload?.result} + " by " + ${message.payload?.reason}`;
                        }
                        setModalData({
                            text : text,
                            button1Text : "New Game",
                            button2Text : "Games history",
                            button1Handler : () => {
                                navigate("/selectGame");
                                setModalData(null);
                            },
                            button2Handler : () => {
                                navigate("/");
                                setModalData(null);
                            }
                        })
                    }
                    setGameOver(true);
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
                case CHAT :
                    console.log(message);
                    dispatch(setMessage({text : message.text, username : message.username}));
                    break; 
                case DRAW :
                    setModalData({
                        text : "Opponent offers draw",
                        button1Text : "Accept",
                        button2Text : "Reject",
                        button1Handler : () => {
                            try{
                                socket?.send(JSON.stringify({
                                    type : DRAW_RESPONSE,
                                    result : true,
                                }))
                                setModalData(null);
                            }
                            catch(error){
                                console.log(error);
                            }
                        },
                        button2Handler : () => {
                            try{
                                socket?.send(JSON.stringify({
                                    type : DRAW_RESPONSE,
                                    result : false,
                                }))
                                setModalData(null);
                            }
                            catch(error){
                                console.log(error);
                            }
                        }
                    })
                    break;
                case DRAW_RESPONSE :
                    if(message.result === false){
                        toast.error("Draw offer Rejected");
                    } 
                    break;
            }
        }
    }, [socket, chess])


    function messageSendHandler(){
        if (!inputRef.current) return;
        const text = inputRef.current.value;
        try{
            socket?.send(JSON.stringify({
                type : CHAT,
                text : text,
            }))
            inputRef.current.value = "";
        }
        catch(err){
            console.error(err);
        }
    }

    function resignHandler(){
        setModalData({
            text : "Are you sure you want to resign",
            button1Text : "Yes",
            button2Text : "No",
            button1Handler : () => {
                try{
                    socket?.send(JSON.stringify({
                        type : RESIGN,
                    }))
                }
                catch(error){
                    console.log(error);
                }
                setModalData(null);
            },
            button2Handler : () => {
                setModalData(null);
            }
        })
    }

    function drawHandler(){
        setModalData({
            text : "Are you sure you want to offer draw",
            button1Text : "Yes",
            button2Text : "No",
            button1Handler : () => {
                try{
                    socket?.send(JSON.stringify({
                        type : DRAW,
                    })) 
                }
                catch(error){
                    console.log(error);
                }
                setModalData(null);
            },
            button2Handler : () => {
                setModalData(null);
            }
        })
    }


    if(loading){
        return (
            <div className="w-screen h-screen flex flex-col items-center justify-center bg-black">
                <div className="loader"></div>
            </div>
        )
    }

    return (
        <div className="relative text-white py-3 px-3 bg-black/80 max-h-screen w-full">

            <div className="flex items-start gap-x-6 justify-between">

                {/* LEFT: player panel — fixed width, stretches to board height via default flex stretch */}
                <div className="w-[23%] shrink-0">
                    {/* players name  */}
                    <div className="border border-zinc-950 rounded-2xl p-3 w-full
                        flex items-center justify-evenly gap-y-2 bg-green-500">
                        <button onClick={() => resignHandler()}
                        className="flex justify-center items-center gap-x-1 text-white font-bold hover:text-black">
                            <Flag/>
                            <p>Resign</p>
                        </button>
                        <button onClick={() => drawHandler()}
                        className="flex justify-center items-center gap-x-1 text-white font-bold hover:text-black">
                            <Handshake/>
                            <p>Offer Draw</p>
                        </button>
                    </div>

                    {/* messaging box  */}
                    <div className="border border-zinc-700 rounded-2xl p-2 flex flex-col mt-3 w-full bg-black gap-y-2">
                        <div className="py-2 px-1 rounded-md text-center bg-zinc-900 border border-zinc-700">
                            <p className="font-bold">Chat Box</p>
                        </div>
                        <div className="border border-zinc-700 bg-zinc-900 py-4 px-3 rounded-2xl h-96 overflow-y-auto flex flex-col gap-y-2">
                            {
                                messages.length === 0 ? (
                                    <div className="flex-1 flex items-center justify-center text-zinc-500 text-sm">
                                        No messages yet
                                    </div>
                                ) : (
                                    messages.map((m: { text: string; username: string }, index: number) => {
                                        const isMe = user.username === m.username;
                                        return (
                                            <div
                                                key={index}
                                                className={`flex flex-col max-w-[75%] ${isMe ? "self-end items-end" : "self-start items-start"}`}
                                            >
                                                <div
                                                    className={`px-3 py-2 rounded-2xl text-sm wrap-break-word
                                                        ${isMe
                                                            ? "bg-green-500 text-black rounded-br-sm"
                                                            : "bg-zinc-700 text-white rounded-bl-sm"
                                                        }`}
                                                >
                                                    {m.text}
                                                </div>
                                            </div>
                                        );
                                    })
                                )
                            }
                        </div>

                        <div className="flex gap-x-2"> 
                            <input ref={inputRef} 
                            type="text" placeholder="Message"
                                className="rounded-xl w-[80%] border border-zinc-700 px-2"/>
                            
                            <button onClick={() => messageSendHandler()}
                             className="bg-black py-1 px-2 border border-green-500 rounded-xl 
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
                        gameOver = {gameOver}
                    />
                </div>

                {/* RIGHT: moves list — fixed width, stretches via default flex stretch */}
                <div className="w-[23%]">
                    <ShowMoves chess={chess} />
                </div>

            </div>

            {
                modalData && <ConfirmationModal {...modalData}/>
            }

        </div>
    )
}