export const TIME_CONTROLS = [
    {
        id: "TC_5_3",
        title: "5 | 3",
        description: "5 min • 3 sec increment",
    },
    {
        id: "TC_10_2",
        title: "10 | 2",
        description: "10 min • 2 sec increment",
    },
    {
        id: "TC_15_3",
        title: "15 | 3",
        description: "15 min • 3 sec increment",
    },
] as const;

export type TimeControl = (typeof TIME_CONTROLS)[number]["id"];