import { Command } from "@src/command_system/type";
import {
    COMMAND_KEY_CREATE_PLANE,
    CommandCreatePlane,
    CreatePlaneParameter,
} from "@src/sketch_object/plane";

export const CommandKeyList = {
    createPlane: COMMAND_KEY_CREATE_PLANE,
} as const;

export type CommandParameter = {
    [CommandKeyList.createPlane]: CreatePlaneParameter;
};

export const CommandList: Command[] = [CommandCreatePlane] as const;
