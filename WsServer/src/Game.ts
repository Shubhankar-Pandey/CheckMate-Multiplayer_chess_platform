import { WebSocket } from "ws";
import { Chess } from "chess.js";
import { GAME_OVER, INIT_GAME, MOVE } from "./messages.js";

interface ClockState {
    whiteTime : number;
    blackTime : number;
    increment : number;
    turn : "w" | "b";
    turnStartedAt : number;
}

export class Game {
    public player1 : {socket : WebSocket, color : "w" | "b"};
    public player2 : {socket : WebSocket, color : "w" | "b"};
    private chess : Chess;
    private clock : ClockState;
    private flagTimeout: NodeJS.Timeout | null = null;


    constructor(player1 : WebSocket, player2 : WebSocket, TC : string){

        const random : number = Math.floor(Math.random()) * 10;
        if(random & 1){
            this.player1 = {socket : player1, color : "w"};
            this.player2 = {socket : player2, color : "b"};
        }
        else{
            this.player1 = {socket : player1, color : "b"};
            this.player2 = {socket : player2, color : "w"};
        }
        
        this.chess = new Chess();
        
        let arr : string[] = TC.split("_");
        const minutes : number | undefined = Number(arr[1]);
        const seconds : number | undefined = Number(arr[2]);
        const time = minutes * 60 * 1000;
        this.clock = {
            whiteTime : time,
            blackTime : time, 
            increment : seconds * 1000,
            turn : "w",
            turnStartedAt : Date.now()
        }
        
        
        this.player1.socket.send(JSON.stringify({
            type : INIT_GAME,
            payload : {
                color : this.player1.color,
                time : time,
            }
        }));
        this.player2.socket.send(JSON.stringify({
            type : INIT_GAME,
            payload : {
                color : this.player2.color,
                time : time,
            }
        }))

        this.startTurnTimer();
    }


    private startTurnTimer(){
        const timeLeft : number = this.clock.turn === 'w' ? this.clock.whiteTime : this.clock.blackTime;
        this.flagTimeout = setTimeout(() => {this.handleFlagFall()}, timeLeft)
    }

    private handleFlagFall(){
        const loser = this.clock.turn; // whoever's turn it was, ran out
        // end game, notify both players, clean up
    }

    makeMove(socket : WebSocket, move : {from : string, to : string}){
        
        if(this.chess.turn() === 'w'){
            const ws_socket : WebSocket = this.player1.color === 'w' ? this.player1.socket : this.player2.socket;
            if(ws_socket !== socket){
                return;
            } 
        }
        else{
            const ws_socket : WebSocket = this.player1.color === 'b' ? this.player1.socket : this.player2.socket;
            if(ws_socket !== socket){
                return;
            } 
        }
        

        try{
            // 1. is the move valid
            // 2. update the board
            // 3. push the move
            // these all the three steps is handled by the chess.js library
            this.chess.move(move); // this line does all the three above mentioned steps
        }
        catch(e){
            console.log("error in makeMove function in game.ts file -> error = ", e);
            return;
        }

        // timer logic 
        const thinkingTime = Date.now() - this.clock.turnStartedAt;
        
        if(this.clock.turn === 'w'){
            this.clock.whiteTime -= thinkingTime;
            this.clock.whiteTime += this.clock.increment;
        }
        else{
            this.clock.blackTime -= thinkingTime;
            this.clock.blackTime += this.clock.increment;
        }

        if(this.flagTimeout){
            clearTimeout(this.flagTimeout);
        }

        this.clock.turn = this.clock.turn === 'w' ? "b" : "w";
        this.clock.turnStartedAt = Date.now();
        this.startTurnTimer();


        // check if the game is over
        if(this.chess.isGameOver()){
            // send the game over message to both the players
            this.player1.socket.send(JSON.stringify({
                type : GAME_OVER,
                payload : {
                    winner : this.chess.turn() === 'w' ? "black" : "white",
                }
            }))
            this.player2.socket.send(JSON.stringify({
                type : GAME_OVER,
                payload : {
                    winner : this.chess.turn() === 'w' ? "black" : "white",
                }
            }))
            return;
        }
        
        // console.log("move before sending to player1 = ", move);
        this.player1.socket.send(JSON.stringify({
            type : MOVE,
            payload : move,
            clock : {
                whiteTime : this.clock.whiteTime,
                blackTime : this.clock.blackTime,
                turn : this.clock.turn,
            }
        }))

        // console.log("move before sending to player1 = ", move);
        this.player2.socket.send(JSON.stringify({
            type : MOVE,
            payload : move,
            clock : {
                whiteTime : this.clock.whiteTime,
                blackTime : this.clock.blackTime,
                turn : this.clock.turn,
            }
        }))

    }
}