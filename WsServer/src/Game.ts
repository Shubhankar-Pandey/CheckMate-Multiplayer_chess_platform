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
    public player1 : {socket : WebSocket, color : "w" | "b", username : string};
    public player2 : {socket : WebSocket, color : "w" | "b", username : string};
    private chess : Chess;
    private clock : ClockState;
    private flagTimeout: NodeJS.Timeout | null = null;
    private isOver = false;



    constructor(player1 : [WebSocket, string], player2 : [WebSocket, string], TC : string, private onGameOver: (player1: WebSocket, player2 : WebSocket) => void){

        // ***************** getting random color *****************
        const random : number = Math.floor(Math.random() * 10);
        if(random & 1){
            this.player1 = {socket : player1[0], color : "w", username : player1[1]};
            this.player2 = {socket : player2[0], color : "b", username : player2[1]};
        }
        else{
            this.player1 = {socket : player1[0], color : "b", username : player1[1]};
            this.player2 = {socket : player2[0], color : "w", username : player2[1]};
        }
        
        // ***************** intialising new game *****************
        this.chess = new Chess();
        
        // ***************** setting the clock *****************
        let arr : string[] = TC.split("_");
        const minutes : number | undefined = Number(arr[1]);
        const seconds : number | undefined = Number(arr[2]);
        const time = minutes * 60 * 1000;
        this.clock = {
            whiteTime : time,
            blackTime : time, 
            increment : seconds * 1000,
            turn : this.chess.turn(),
            turnStartedAt : Date.now()
        }
        
        // ***************** send message to both player *****************
        this.player1.socket.send(JSON.stringify({
            type : INIT_GAME,
            payload : {
                color : this.player1.color,
                time : time,
                opponent : this.player2.username,
            }
        }));
        this.player2.socket.send(JSON.stringify({
            type : INIT_GAME,
            payload : {
                color : this.player2.color,
                time : time,
                opponent : this.player1.username,
            }
        }))

        // ***************** starting the clock for left time *****************
        this.startTurnTimer();
    }




    private startTurnTimer(){
        const timeLeft : number = this.clock.turn === 'w' ? this.clock.whiteTime : this.clock.blackTime;
        this.flagTimeout = setTimeout(() => {this.handleFlagFall()}, timeLeft)
    }




    private handleFlagFall(){
        const loserColor = this.clock.turn; // whoever's turn it was, ran out of time 
        const winner = loserColor === "w" ? "b" : "w";
        
        // end game, notify both players, clean up
        this.endGame({ winner, reason: "timeout" });
    }




    private endGame(payload: any){
        if(this.isOver) return;   
        this.isOver = true;

        if(this.flagTimeout){
            clearTimeout(this.flagTimeout);
            this.flagTimeout = null;
        }

        const response = JSON.stringify({ type: GAME_OVER, payload });
        this.player1.socket.send(response);
        this.player2.socket.send(response);

        // game over, remove this game from game manager
        this.onGameOver(this.player1.socket, this.player2.socket);  
    }

    


    makeMove(socket : WebSocket, move : {from : string, to : string}){

        if(this.isOver) return; 
        
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
            // 1. is the move valid, 2. update the board, 3. push the move
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

        this.clock.turn = this.chess.turn();
        this.clock.turnStartedAt = Date.now();
        


        // check if the game is over
        // send the game over message to both the players
        if(this.chess.isStalemate()){
            this.endGame({result : "Draw", reason : "Stalemate"});
            return;
        }
        else if(this.chess.isInsufficientMaterial()){
            this.endGame({result : "Draw", reason : "Insufficient Material"});
            return;
        }
        else if(this.chess.isDrawByFiftyMoves()){
            this.endGame({result : "Draw", reason : "Draw By Fifty Moves"});
            return;
        }
        else if(this.chess.isThreefoldRepetition()){
            this.endGame({result : "Draw", reason : "Three fold Repetition"});
            return;
        }
        else if(this.chess.isCheckmate()){
            this.endGame({winner : this.chess.turn() === 'w' ? "b" : "w", reason : "checkmate"})
            return;
        }
        else if(this.chess.isDraw()){
            this.endGame({result : "Draw"});
            return;
        }


        // if the game is not over
        this.startTurnTimer();
        
        // console.log("move before sending to player1 = ", move);
        const sendingMessage = {
            type : MOVE,
            payload : move,
            clock : {
                whiteTime : this.clock.whiteTime,
                blackTime : this.clock.blackTime,
                turn : this.clock.turn,
            }
        };
        this.player1.socket.send(JSON.stringify(sendingMessage));
        this.player2.socket.send(JSON.stringify(sendingMessage));
    }
}