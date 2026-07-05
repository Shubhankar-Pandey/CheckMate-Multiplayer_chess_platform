import * as $Enums from "./enums.js";
import type * as Prisma from "./internal/prismaNamespace.js";
export type IntFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntFilter<$PrismaModel> | number;
};
export type StringFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedStringFilter<$PrismaModel> | string;
};
export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatFilter<$PrismaModel>;
    _sum?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedIntFilter<$PrismaModel>;
    _max?: Prisma.NestedIntFilter<$PrismaModel>;
};
export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedStringFilter<$PrismaModel>;
    _max?: Prisma.NestedStringFilter<$PrismaModel>;
};
export type EnumTimeControlTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TimeControlType | Prisma.EnumTimeControlTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.TimeControlType[] | Prisma.ListEnumTimeControlTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TimeControlType[] | Prisma.ListEnumTimeControlTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumTimeControlTypeFilter<$PrismaModel> | $Enums.TimeControlType;
};
export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeFilter<$PrismaModel> | Date | string;
};
export type EnumGameStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.GameStatus | Prisma.EnumGameStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.GameStatus[] | Prisma.ListEnumGameStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.GameStatus[] | Prisma.ListEnumGameStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumGameStatusFilter<$PrismaModel> | $Enums.GameStatus;
};
export type EnumGameResultFilter<$PrismaModel = never> = {
    equals?: $Enums.GameResult | Prisma.EnumGameResultFieldRefInput<$PrismaModel>;
    in?: $Enums.GameResult[] | Prisma.ListEnumGameResultFieldRefInput<$PrismaModel>;
    notIn?: $Enums.GameResult[] | Prisma.ListEnumGameResultFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumGameResultFilter<$PrismaModel> | $Enums.GameResult;
};
export type EnumTimeControlTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TimeControlType | Prisma.EnumTimeControlTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.TimeControlType[] | Prisma.ListEnumTimeControlTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TimeControlType[] | Prisma.ListEnumTimeControlTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumTimeControlTypeWithAggregatesFilter<$PrismaModel> | $Enums.TimeControlType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumTimeControlTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumTimeControlTypeFilter<$PrismaModel>;
};
export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedDateTimeFilter<$PrismaModel>;
    _max?: Prisma.NestedDateTimeFilter<$PrismaModel>;
};
export type EnumGameStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GameStatus | Prisma.EnumGameStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.GameStatus[] | Prisma.ListEnumGameStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.GameStatus[] | Prisma.ListEnumGameStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumGameStatusWithAggregatesFilter<$PrismaModel> | $Enums.GameStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumGameStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumGameStatusFilter<$PrismaModel>;
};
export type EnumGameResultWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GameResult | Prisma.EnumGameResultFieldRefInput<$PrismaModel>;
    in?: $Enums.GameResult[] | Prisma.ListEnumGameResultFieldRefInput<$PrismaModel>;
    notIn?: $Enums.GameResult[] | Prisma.ListEnumGameResultFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumGameResultWithAggregatesFilter<$PrismaModel> | $Enums.GameResult;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumGameResultFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumGameResultFilter<$PrismaModel>;
};
export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntFilter<$PrismaModel> | number;
};
export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedStringFilter<$PrismaModel> | string;
};
export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatFilter<$PrismaModel>;
    _sum?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedIntFilter<$PrismaModel>;
    _max?: Prisma.NestedIntFilter<$PrismaModel>;
};
export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedFloatFilter<$PrismaModel> | number;
};
export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedStringFilter<$PrismaModel>;
    _max?: Prisma.NestedStringFilter<$PrismaModel>;
};
export type NestedEnumTimeControlTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TimeControlType | Prisma.EnumTimeControlTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.TimeControlType[] | Prisma.ListEnumTimeControlTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TimeControlType[] | Prisma.ListEnumTimeControlTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumTimeControlTypeFilter<$PrismaModel> | $Enums.TimeControlType;
};
export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeFilter<$PrismaModel> | Date | string;
};
export type NestedEnumGameStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.GameStatus | Prisma.EnumGameStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.GameStatus[] | Prisma.ListEnumGameStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.GameStatus[] | Prisma.ListEnumGameStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumGameStatusFilter<$PrismaModel> | $Enums.GameStatus;
};
export type NestedEnumGameResultFilter<$PrismaModel = never> = {
    equals?: $Enums.GameResult | Prisma.EnumGameResultFieldRefInput<$PrismaModel>;
    in?: $Enums.GameResult[] | Prisma.ListEnumGameResultFieldRefInput<$PrismaModel>;
    notIn?: $Enums.GameResult[] | Prisma.ListEnumGameResultFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumGameResultFilter<$PrismaModel> | $Enums.GameResult;
};
export type NestedEnumTimeControlTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TimeControlType | Prisma.EnumTimeControlTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.TimeControlType[] | Prisma.ListEnumTimeControlTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TimeControlType[] | Prisma.ListEnumTimeControlTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumTimeControlTypeWithAggregatesFilter<$PrismaModel> | $Enums.TimeControlType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumTimeControlTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumTimeControlTypeFilter<$PrismaModel>;
};
export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedDateTimeFilter<$PrismaModel>;
    _max?: Prisma.NestedDateTimeFilter<$PrismaModel>;
};
export type NestedEnumGameStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GameStatus | Prisma.EnumGameStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.GameStatus[] | Prisma.ListEnumGameStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.GameStatus[] | Prisma.ListEnumGameStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumGameStatusWithAggregatesFilter<$PrismaModel> | $Enums.GameStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumGameStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumGameStatusFilter<$PrismaModel>;
};
export type NestedEnumGameResultWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GameResult | Prisma.EnumGameResultFieldRefInput<$PrismaModel>;
    in?: $Enums.GameResult[] | Prisma.ListEnumGameResultFieldRefInput<$PrismaModel>;
    notIn?: $Enums.GameResult[] | Prisma.ListEnumGameResultFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumGameResultWithAggregatesFilter<$PrismaModel> | $Enums.GameResult;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumGameResultFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumGameResultFilter<$PrismaModel>;
};
//# sourceMappingURL=commonInputTypes.d.ts.map