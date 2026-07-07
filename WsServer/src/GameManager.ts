import { Game } from "./Game.js";
import { WebSocket } from "ws";
import { INIT_GAME, MOVE, TC_10_2, TC_15_2, TC_5_3 } from "./messages.js";




export class GameManager {
    private games : Map<WebSocket, Game>;
    private users : WebSocket[]; 
    private pendingUserMap : Map<string, WebSocket>;


    constructor(){
        this.games = new Map<WebSocket, Game>();
        this.users = [];
        this.pendingUserMap = new Map<string, WebSocket>();
    }

    addUser(socket : WebSocket){
        this.users.push(socket);
        this.addHandler(socket);
        socket.on("close", () => {
            this.removeUser(socket);
        });
    }

    removeUser(socket : WebSocket){
        this.users = this.users.filter((s) => s !== socket)
        // stop the game here because the user left
    }

    private checkMatching(TC: string, socket: WebSocket){
        const waitingSocket = this.pendingUserMap.get(TC);

        if(waitingSocket === socket){
            // same player sent init twice, ignore
            return;
        }
        else if(waitingSocket === undefined){
            // no one waiting, this player waits
            this.pendingUserMap.set(TC, socket);
        }
        else{
            const player1: WebSocket = socket;
            const player2: WebSocket = waitingSocket;
            this.pendingUserMap.delete(TC);
            const game = new Game(player1, player2, TC, (player1 : WebSocket, player2 : WebSocket) => {
                this.removeGame(player1, player2);
            });
            this.games.set(player1, game);
            this.games.set(player2, game);
        }
    }

    private removeGame(player1 : WebSocket, player2 : WebSocket){
        this.games.delete(player1);
        this.games.delete(player2);
        // players stay in this.users since they're still connected;
        // they can matchmake into a new game from here if they want
    }

    private addHandler(socket : WebSocket){
        socket.on("message", (data) => {
            const message = JSON.parse(data.toString());

            console.log("message = ", message);

            // message = {
            //     type : 'init_game',
            //     timeControl : "TC_5_3"
            // }

            if(message.type === INIT_GAME){
                
                // means user want to start a game
                switch(message.timeControl){
                    case TC_5_3 : 
                        this.checkMatching(TC_5_3, socket);
                        break;
                    case TC_10_2 : 
                        this.checkMatching(TC_10_2, socket);
                        break;
                    case TC_15_2 : 
                        this.checkMatching(TC_15_2, socket);
                        break;
                }
            }
            else if(message.type === MOVE){
                const game = this.games.get(socket);
                if(game){
                    game.makeMove(socket, message.payload);
                }
            }
        })
    }
}