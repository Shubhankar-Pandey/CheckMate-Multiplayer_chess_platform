import { Game } from "./Game.js";
import { WebSocket } from "ws";
import { CHAT, DRAW, DRAW_OFFER, DRAW_RESPONSE, INIT_GAME, MOVE, REGINATION, RESIGN, TC_10_2, TC_15_2, TC_5_3 } from "./messages.js";




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
            else if(message.type === CHAT){
                const text = message.text;
                const getGame = this.games.get(socket);
                const sendMessage = {
                    type : CHAT,
                    text : text,
                    username
                }
                getGame?.player1.socket.send(JSON.stringify(sendMessage));
                getGame?.player2.socket.send(JSON.stringify(sendMessage));
            }
            else if(message.type === RESIGN){
                const getGame = this.games.get(socket);
                const winner = getGame?.player1.socket === socket ?
                                        getGame?.player2.username : 
                                        getGame?.player1.username;
                getGame?.endGame({reason : REGINATION, winner : winner})
            }
            else if(message.type === DRAW){
                const getGame = this.games.get(socket);
                const sendMessage = {
                    type : DRAW,
                }
                if(getGame?.player1.username !== username){
                    getGame?.player1.socket.send(JSON.stringify(sendMessage));
                }
                else{
                    getGame?.player2.socket.send(JSON.stringify(sendMessage));
                }
            }
            else if(message.type === DRAW_RESPONSE){
                const getGame = this.games.get(socket);
                if(message.result === true){
                    getGame?.endGame({reason : DRAW_OFFER})
                }
                else{
                    const sendMessage = {
                        type : DRAW_RESPONSE,
                        result : false,
                    }
                    if(getGame?.player1.username !== username){
                        getGame?.player1.socket.send(JSON.stringify(sendMessage));
                    }
                    else{
                        getGame?.player2.socket.send(JSON.stringify(sendMessage));
                    }
                }
            }
        })
    }
}