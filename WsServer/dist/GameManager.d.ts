import { WebSocket } from "ws";
export declare class GameManager {
    private games;
    private pendingUserMap;
    connectedUsers: Map<string, WebSocket>;
    constructor();
    addUser(socket: WebSocket, username: string): void;
    private checkMatching;
    private removeGame;
    private addHandler;
}
//# sourceMappingURL=GameManager.d.ts.map