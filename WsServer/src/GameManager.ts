import { Game } from "./Game.js";
import { WebSocket } from "ws";
import { INIT_GAME, MOVE, TC_10_2, TC_15_2, TC_5_3 } from "./messages.js";




export class GameManager {
    private games : Map<WebSocket, Game>; 
    private pendingUserMap : Map<string, [WebSocket, string]>;
    connectedUsers : Map<string, WebSocket>;

    constructor(){
        this.games = new Map<WebSocket, Game>();
        this.connectedUsers = new Map<string, WebSocket>();
        this.pendingUserMap = new Map<string, [WebSocket, string]>();
    }

    addUser(socket : WebSocket, username : string){
        this.connectedUsers.set(username, socket);
        console.log("new user added = ", username);
        this.addHandler(socket, username);
        console.log("new user added");
    }

    private checkMatching(TC: string, socket: WebSocket, username : string){
        const waitingSocket : undefined | [WebSocket, string] = this.pendingUserMap.get(TC);

        if(username === undefined){
            return;
        }
        else if(waitingSocket === undefined){
            // no one waiting, therefore this player waits
            this.pendingUserMap.set(TC, [socket, username]);
        }
        else if(waitingSocket[0] === socket){
            // same player sent init twice, ignore
            return;
        }
        else{
            const player1: [WebSocket, string] = [socket, username];
            const player2: [WebSocket, string] = waitingSocket;
            this.pendingUserMap.delete(TC);
            const game = new Game(player1, player2, TC, (player1 : WebSocket, player2 : WebSocket) => {
                this.removeGame(player1, player2);
            });
            this.games.set(player1[0], game);
            this.games.set(player2[0], game);
        }
    }

    private removeGame(player1 : WebSocket, player2 : WebSocket){
        this.games.delete(player1);
        this.games.delete(player2);
        // players stay in this.users since they're still connected;
        // they can matchmake into a new game from here if they want
    }

    private addHandler(socket : WebSocket, username : string){
        socket.on("message", (data) => {
            const message = JSON.parse(data.toString());

            console.log("message = ", message);

            // message = {
            //     type : 'init_game',
            //     timeControl : "TC_5_3",
            // }

            if(message.type === INIT_GAME){
                
                // means user want to start a game
                switch(message.timeControl){
                    case TC_5_3 : 
                        this.checkMatching(TC_5_3, socket, username);
                        break;
                    case TC_10_2 : 
                        this.checkMatching(TC_10_2, socket, username);
                        break;
                    case TC_15_2 : 
                        this.checkMatching(TC_15_2, socket, username);
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