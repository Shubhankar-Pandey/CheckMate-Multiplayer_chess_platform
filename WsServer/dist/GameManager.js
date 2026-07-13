import { Game } from "./Game.js";
import { WebSocket } from "ws";
import { INIT_GAME, MOVE, TC_10_2, TC_15_2, TC_5_3 } from "./messages.js";
export class GameManager {
    games;
    pendingUserMap;
    connectedUsers;
    constructor() {
        this.games = new Map();
        this.connectedUsers = new Map();
        this.pendingUserMap = new Map();
    }
    addUser(socket, username) {
        this.connectedUsers.set(username, socket);
        console.log("new user added = ", username);
        this.addHandler(socket, username);
        console.log("new user added");
    }
    checkMatching(TC, socket, username) {
        const waitingSocket = this.pendingUserMap.get(TC);
        if (username === undefined) {
            return;
        }
        else if (waitingSocket === undefined) {
            // no one waiting, therefore this player waits
            this.pendingUserMap.set(TC, [socket, username]);
        }
        else if (waitingSocket[0] === socket) {
            // same player sent init twice, ignore
            return;
        }
        else {
            const player1 = [socket, username];
            const player2 = waitingSocket;
            this.pendingUserMap.delete(TC);
            const game = new Game(player1, player2, TC, (player1, player2) => {
                this.removeGame(player1, player2);
            });
            this.games.set(player1[0], game);
            this.games.set(player2[0], game);
        }
    }
    removeGame(player1, player2) {
        this.games.delete(player1);
        this.games.delete(player2);
        // players stay in this.users since they're still connected;
        // they can matchmake into a new game from here if they want
    }
    addHandler(socket, username) {
        socket.on("message", (data) => {
            const message = JSON.parse(data.toString());
            console.log("message = ", message);
            // message = {
            //     type : 'init_game',
            //     timeControl : "TC_5_3",
            // }
            if (message.type === INIT_GAME) {
                // means user want to start a game
                switch (message.timeControl) {
                    case TC_5_3:
                        this.checkMatching(TC_5_3, socket, username);
                        break;
                    case TC_10_2:
                        this.checkMatching(TC_10_2, socket, username);
                        break;
                    case TC_15_2:
                        this.checkMatching(TC_15_2, socket, username);
                        break;
                }
            }
            else if (message.type === MOVE) {
                const game = this.games.get(socket);
                if (game) {
                    game.makeMove(socket, message.payload);
                }
            }
        });
    }
}
//# sourceMappingURL=GameManager.js.map