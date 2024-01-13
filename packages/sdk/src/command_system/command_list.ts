import { Command } from "@src/command_system/type";
import {
    COMMAND_KEY_SET_ORTHOGRAPHIC_CAMERA,
    COMMAND_KEY_SET_PERSPECTIVE_CAMERA,
    CommandSetOrthographicCamera,
    CommandSetPerspectiveCamera,
} from "@src/scene_renderer/command";
import {
    COMMAND_KEY_CREATE_PLANE,
    CommandCreatePlane,
    CreatePlaneParameter,
} from "@src/sketch_object/plane";

export const CommandKeyList = {
    createPlane: COMMAND_KEY_CREATE_PLANE,
    setPerspectiveCamera: COMMAND_KEY_SET_PERSPECTIVE_CAMERA,
    setOrthographicCamera: COMMAND_KEY_SET_ORTHOGRAPHIC_CAMERA
} as const;

export type CommandParameter = {
    [CommandKeyList.createPlane]: CreatePlaneParameter;
};

export const CommandList: Command[] = [
    CommandCreatePlane,
    CommandSetPerspectiveCamera,
    CommandSetOrthographicCamera
] as const;
