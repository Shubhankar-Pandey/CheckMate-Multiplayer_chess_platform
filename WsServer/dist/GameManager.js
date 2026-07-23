import { Game } from "./Game.js";
import { WebSocket } from "ws";
import { CHAT, DRAW, DRAW_OFFER, DRAW_RESPONSE, INIT_GAME, MOVE, REGINATION, RESIGN, RUNNING_GAME, TC_10_2, TC_15_2, TC_5_3 } from "./messages.js";
export class GameManager {
    games;
    pendingUserMap; // Map<TC(timeControl), [socket, username]>
    connectedUsers;
    constructor() {
        this.games = new Map();
        this.connectedUsers = new Map();
        this.pendingUserMap = new Map();
    }
    addUser(socket, username) {
        this.connectedUsers.set(username, socket);
        this.addHandler(socket, username);
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
            this.games.set(player1[1], game);
            this.games.set(player2[1], game);
        }
    }
    removeGame(player1, player2) {
        this.games.delete(player1);
        this.games.delete(player2);
    }
    checkAlreadyRunningGame(username, socket) {
        const runningGame = this.games.get(username);
        if (!runningGame) {
            return false;
        }
        if (runningGame.player1.username === username) {
            runningGame.player1.socket = socket;
            runningGame.player1.socket.send(JSON.stringify({
                type: RUNNING_GAME,
                payload: {
                    color: runningGame.player1.color,
                    opponent: runningGame.player2.username,
                },
                time: {
                    whiteTime: runningGame.clock.whiteTime,
                    blackTime: runningGame.clock.blackTime,
                },
                turn: runningGame.clock.turn,
                pgn: runningGame.chess.pgn(),
            }));
        }
        else if (runningGame.player2.username === username) {
            runningGame.player2.socket = socket;
            runningGame.player2.socket.send(JSON.stringify({
                type: RUNNING_GAME,
                payload: {
                    color: runningGame.player2.color,
                    opponent: runningGame.player1.username,
                },
                time: {
                    whiteTime: runningGame.clock.whiteTime,
                    blackTime: runningGame.clock.blackTime,
                },
                turn: runningGame.clock.turn,
                pgn: runningGame.chess.pgn(),
            }));
        }
        return true;
    }
    addHandler(socket, username) {
        socket.on("message", (data) => {
            const message = JSON.parse(data.toString());
            // message = {
            //     type : 'init_game',
            //     timeControl : "TC_5_3",
            // }
            if (message.type === INIT_GAME) {
                if (!this.checkAlreadyRunningGame(username, socket)) {
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
            }
            else if (message.type === MOVE) {
                const game = this.games.get(username);
                if (game) {
                    game.makeMove(socket, message.payload);
                }
            }
            else if (message.type === CHAT) {
                const text = message.text;
                const getGame = this.games.get(username);
                const sendMessage = {
                    type: CHAT,
                    text: text,
                    username
                };
                getGame?.player1.socket.send(JSON.stringify(sendMessage));
                getGame?.player2.socket.send(JSON.stringify(sendMessage));
            }
            else if (message.type === RESIGN) {
                const getGame = this.games.get(username);
                const winner = getGame?.player1.socket === socket ?
                    getGame?.player2.username :
                    getGame?.player1.username;
                getGame?.endGame({ reason: REGINATION, winner: winner });
            }
            else if (message.type === DRAW) {
                const getGame = this.games.get(username);
                const sendMessage = {
                    type: DRAW,
                };
                if (getGame?.player1.username !== username) {
                    getGame?.player1.socket.send(JSON.stringify(sendMessage));
                }
                else {
                    getGame?.player2.socket.send(JSON.stringify(sendMessage));
                }
            }
            else if (message.type === DRAW_RESPONSE) {
                const getGame = this.games.get(username);
                if (message.result === true) {
                    getGame?.endGame({ reason: DRAW_OFFER });
                }
                else {
                    const sendMessage = {
                        type: DRAW_RESPONSE,
                        result: false,
                    };
                    if (getGame?.player1.username !== username) {
                        getGame?.player1.socket.send(JSON.stringify(sendMessage));
                    }
                    else {
                        getGame?.player2.socket.send(JSON.stringify(sendMessage));
                    }
                }
            }
        });
    }
}
//# sourceMappingURL=GameManager.js.map