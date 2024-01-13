import { Command } from "@src/command_system/type";

export const COMMAND_KEY_CREATE_PLANE = "create_plane";
export type CreatePlaneParameter = {
    parallelTo: "XY" | "XZ" | "YZ";
    offset: number;
};
export const CommandCreatePlane: Command = {
    key: COMMAND_KEY_CREATE_PLANE,
    modification: true,
    run(context, commandParameter) {
        return {
            key: COMMAND_KEY_CREATE_PLANE,
            parameter: commandParameter,
            rollback() {},
        };
    },
} as const;
