export declare const TimeControlType: {
    readonly TC_5_3: "TC_5_3";
    readonly TC_10_2: "TC_10_2";
    readonly TC_15_3: "TC_15_3";
};
export type TimeControlType = (typeof TimeControlType)[keyof typeof TimeControlType];
export declare const GameStatus: {
    readonly IN_PROGRESS: "IN_PROGRESS";
    readonly COMPLETED: "COMPLETED";
    readonly ABANDONED: "ABANDONED";
    readonly TIME_UP: "TIME_UP";
    readonly PLAYER_EXIT: "PLAYER_EXIT";
};
export type GameStatus = (typeof GameStatus)[keyof typeof GameStatus];
export declare const GameResult: {
    readonly WHITE_WINS: "WHITE_WINS";
    readonly BLACK_WINS: "BLACK_WINS";
    readonly DRAW: "DRAW";
};
export type GameResult = (typeof GameResult)[keyof typeof GameResult];
//# sourceMappingURL=enums.d.ts.map