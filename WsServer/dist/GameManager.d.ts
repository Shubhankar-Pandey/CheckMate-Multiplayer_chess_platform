import { WebSocket } from "ws";
export declare class GameManager {
    private games;
    private pendingUser;
    private users;
    private pendingUser_10_2;
    constructor();
    addUser(socket: WebSocket): void;
    removeUser(socket: WebSocket): void;
    private addHandler;
}
//# sourceMappingURL=GameManager.d.ts.map