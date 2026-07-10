import { WebSocket } from "ws";
export declare class GameManager {
    private games;
    private users;
    private pendingUserMap;
    constructor();
    addUser(socket: WebSocket): void;
    removeUser(socket: WebSocket): void;
    private checkMatching;
    private removeGame;
    private addHandler;
}
//# sourceMappingURL=GameManager.d.ts.map