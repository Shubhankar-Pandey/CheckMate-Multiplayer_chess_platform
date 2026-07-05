import { WebSocket } from "ws";
import { Chess } from "chess.js";
import { GAME_OVER, INIT_GAME, MOVE } from "./messages.js";

export class Game {
    public player1 : WebSocket;
    public player2 : WebSocket;
    private chess : Chess;
    private startTime : Date;

    constructor(player1 : WebSocket, player2 : WebSocket){
        this.player1 = player1;
        this.player2 = player2;
        this.chess = new Chess();
        this.startTime = new Date();
        
        
        this.player1.send(JSON.stringify({
            type : INIT_GAME,
            payload : {
                color : "white",
            }
        }));
        this.player2.send(JSON.stringify({
            type : INIT_GAME,
            payload : {
                color : "black",
            }
        }))
        // here according to our logic 
        // player 1 is white 
        // player 2 is black
    }

    makeMove(socket : WebSocket, move : {from : string, to : string}){
        // validate the type of move using zod 
        
        // Player 1 is white 
        // Player 2 is black 
        // Is it this users move,
        if(this.chess.turn() === 'w' && socket !== this.player1){
            return;
        }
        if(this.chess.turn() === 'b' && socket !== this.player2){
            return;
        }
        

        try{
            // console.log("move = ", move);
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

        // check if the game is over
        if(this.chess.isGameOver()){
            // send the game over message to both the players
            this.player1.send(JSON.stringify({
                type : GAME_OVER,
                payload : {
                    winner : this.chess.turn() === 'w' ? "black" : "white",
                }
            }))
            this.player2.send(JSON.stringify({
                type : GAME_OVER,
                payload : {
                    winner : this.chess.turn() === 'w' ? "black" : "white",
                }
            }))
            return;
        }
        
        // console.log("move before sending to player1 = ", move);
        this.player1.send(JSON.stringify({
            type : MOVE,
            payload : move,
        }))

        // console.log("move before sending to player1 = ", move);
        this.player2.send(JSON.stringify({
            type : MOVE,
            payload : move,
        }))

    }
}