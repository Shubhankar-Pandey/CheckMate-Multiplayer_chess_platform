import { WebSocket } from "ws";
import { Chess } from "chess.js";
interface ClockState {
    whiteTime: number;
    blackTime: number;
    increment: number;
    turn: "w" | "b";
    turnStartedAt: number;
}
export declare class Game {
    private onGameOver;
    player1: {
        socket: WebSocket;
        color: "w" | "b";
        username: string;
    };
    player2: {
        socket: WebSocket;
        color: "w" | "b";
        username: string;
    };
    chess: Chess;
    clock: ClockState;
    private flagTimeout;
    private isOver;
    constructor(player1: [WebSocket, string], player2: [WebSocket, string], TC: string, onGameOver: (player1: string, player2: string) => void);
    private startTurnTimer;
    private handleFlagFall;
    endGame(payload: any): void;
    makeMove(socket: WebSocket, move: {
        from: string;
        to: string;
    }): void;
}
export {};
//# sourceMappingURL=Game.d.ts.map