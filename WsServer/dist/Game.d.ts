import { WebSocket } from "ws";
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
    private chess;
    private clock;
    private flagTimeout;
    private isOver;
    constructor(player1: [WebSocket, string], player2: [WebSocket, string], TC: string, onGameOver: (player1: WebSocket, player2: WebSocket) => void);
    private startTurnTimer;
    private handleFlagFall;
    private endGame;
    makeMove(socket: WebSocket, move: {
        from: string;
        to: string;
    }): void;
}
//# sourceMappingURL=Game.d.ts.map