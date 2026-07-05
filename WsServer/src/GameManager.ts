import { Game } from "./Game.js";
import { WebSocket } from "ws";
import { INIT_GAME, MOVE } from "./messages.js";


export class GameManager {
    private games : Game[];
    private pendingUser : WebSocket | null;
    private users : WebSocket[]; 

    constructor(){
        this.games = [];
        this.pendingUser = null;
        this.users = [];
    }

    addUser(socket : WebSocket){
        this.users.push(socket);
        this.addHandler(socket);
    }

    removeUser(socket : WebSocket){
        this.users = this.users.filter((s) => s !== socket)
        // stop the game here because the user left
    }

    private addHandler(socket : WebSocket){
        socket.on("message", (data) => {
            const message = JSON.parse(data.toString());
            // console.log("message = ", message);

            if(message.type === INIT_GAME){
                
                // means user want to start a game
                if(this.pendingUser){
                    // start a game
                    const game = new Game(this.pendingUser, socket); 
                    this.games.push(game);
                    this.pendingUser = null;
                    console.log("new game started");
                }
                else{
                    // console.log("pending user me aagaya");
                    this.pendingUser = socket;
                }
            }
            else if(message.type === MOVE){
                // console.log("message = ", message);
                const game = this.games.find(game => game.player1 === socket || game.player2 === socket)
                if(game){
                    // console.log("game found");
                    game.makeMove(socket, message.payload);
                }
            }
        })
    }
}