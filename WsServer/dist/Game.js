import { WebSocket } from "ws";
import { Chess } from "chess.js";
import { drawByFiftyMovesPayload, drawPayload, GAME_OVER, INIT_GAME, insufficientMaterialPayload, MOVE, stalematePayload, threefoldRepetitionPayload } from "./messages.js";
export class Game {
    onGameOver;
    player1;
    player2;
    chess;
    clock;
    flagTimeout = null;
    isOver = false;
    constructor(player1, player2, TC, onGameOver) {
        this.onGameOver = onGameOver;
        // ***************** getting random color *****************
        const random = Math.floor(Math.random() * 10);
        if (random & 1) {
            this.player1 = { socket: player1[0], color: "w", username: player1[1] };
            this.player2 = { socket: player2[0], color: "b", username: player2[1] };
        }
        else {
            this.player1 = { socket: player1[0], color: "b", username: player1[1] };
            this.player2 = { socket: player2[0], color: "w", username: player2[1] };
        }
        // ***************** intialising new game *****************
        this.chess = new Chess();
        // ***************** setting the clock *****************
        let arr = TC.split("_");
        const minutes = Number(arr[1]);
        const seconds = Number(arr[2]);
        const time = minutes * 60 * 1000;
        this.clock = {
            whiteTime: time,
            blackTime: time,
            increment: seconds * 1000,
            turn: this.chess.turn(),
            turnStartedAt: Date.now()
        };
        // ***************** send message to both player *****************
        this.player1.socket.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color: this.player1.color,
                time: time,
                opponent: this.player2.username,
            }
        }));
        this.player2.socket.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color: this.player2.color,
                time: time,
                opponent: this.player1.username,
            }
        }));
        // ***************** starting the clock for left time *****************
        this.startTurnTimer();
    }
    startTurnTimer() {
        const timeLeft = this.clock.turn === 'w' ? this.clock.whiteTime : this.clock.blackTime;
        this.flagTimeout = setTimeout(() => { this.handleFlagFall(); }, timeLeft);
    }
    handleFlagFall() {
        const loserColor = this.clock.turn; // whoever's turn it was, ran out of time 
        const winner = loserColor === "w" ? "b" : "w";
        // end game, notify both players, clean up
        this.endGame({ winner, reason: "timeout" });
    }
    endGame(payload) {
        if (this.isOver)
            return;
        this.isOver = true;
        if (this.flagTimeout) {
            clearTimeout(this.flagTimeout);
            this.flagTimeout = null;
        }
        const response = JSON.stringify({ type: GAME_OVER, payload });
        this.player1.socket.send(response);
        this.player2.socket.send(response);
        this.onGameOver(this.player1.socket, this.player2.socket); // <-- tell GameManager "I'm done, remove me"
    }
    makeMove(socket, move) {
        if (this.isOver)
            return;
        if (this.chess.turn() === 'w') {
            const ws_socket = this.player1.color === 'w' ? this.player1.socket : this.player2.socket;
            if (ws_socket !== socket) {
                return;
            }
        }
        else {
            const ws_socket = this.player1.color === 'b' ? this.player1.socket : this.player2.socket;
            if (ws_socket !== socket) {
                return;
            }
        }
        try {
            // 1. is the move valid, 2. update the board, 3. push the move
            // these all the three steps is handled by the chess.js library
            this.chess.move(move); // this line does all the three above mentioned steps
        }
        catch (e) {
            console.log("error in makeMove function in game.ts file -> error = ", e);
            return;
        }
        // timer logic 
        const thinkingTime = Date.now() - this.clock.turnStartedAt;
        if (this.clock.turn === 'w') {
            this.clock.whiteTime -= thinkingTime;
            this.clock.whiteTime += this.clock.increment;
        }
        else {
            this.clock.blackTime -= thinkingTime;
            this.clock.blackTime += this.clock.increment;
        }
        if (this.flagTimeout) {
            clearTimeout(this.flagTimeout);
        }
        this.clock.turn = this.chess.turn();
        this.clock.turnStartedAt = Date.now();
        // check if the game is over
        // send the game over message to both the players
        if (this.chess.isStalemate()) {
            this.endGame(stalematePayload);
            return;
        }
        else if (this.chess.isInsufficientMaterial()) {
            this.endGame(insufficientMaterialPayload);
            return;
        }
        else if (this.chess.isDrawByFiftyMoves()) {
            this.endGame(drawByFiftyMovesPayload);
            return;
        }
        else if (this.chess.isThreefoldRepetition()) {
            this.endGame(threefoldRepetitionPayload);
            return;
        }
        else if (this.chess.isCheckmate()) {
            this.endGame({ winner: this.chess.turn() === 'w' ? "b" : "w", reasong: "checkmate" });
            return;
        }
        else if (this.chess.isDraw()) {
            this.endGame(drawPayload);
            return;
        }
        this.startTurnTimer();
        // console.log("move before sending to player1 = ", move);
        this.player1.socket.send(JSON.stringify({
            type: MOVE,
            payload: move,
            clock: {
                whiteTime: this.clock.whiteTime,
                blackTime: this.clock.blackTime,
                turn: this.clock.turn,
            }
        }));
        // console.log("move before sending to player1 = ", move);
        this.player2.socket.send(JSON.stringify({
            type: MOVE,
            payload: move,
            clock: {
                whiteTime: this.clock.whiteTime,
                blackTime: this.clock.blackTime,
                turn: this.clock.turn,
            }
        }));
    }
}
//# sourceMappingURL=Game.js.map