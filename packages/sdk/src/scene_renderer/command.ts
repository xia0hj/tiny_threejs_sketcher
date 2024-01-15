import { Command } from "@src/command_system";
import { CAMERA_TYPE } from "@src/constant/enum";

export const COMMAND_KEY_SET_PERSPECTIVE_CAMERA = "set_perspective_camera";
export const CommandSetPerspectiveCamera: Command<typeof COMMAND_KEY_SET_PERSPECTIVE_CAMERA> = {
  key: COMMAND_KEY_SET_PERSPECTIVE_CAMERA,
  modification: false,
  run(context) {
    context.sceneRenderer?.setCameraType(CAMERA_TYPE.perspectiveCamera);
  },
};

export const COMMAND_KEY_SET_ORTHOGRAPHIC_CAMERA = "set_orthographic_camera";
export const CommandSetOrthographicCamera: Command<typeof COMMAND_KEY_SET_ORTHOGRAPHIC_CAMERA> = {
  key: COMMAND_KEY_SET_ORTHOGRAPHIC_CAMERA,
  modification: false,
  run(context) {
    context.sceneRenderer?.setCameraType(CAMERA_TYPE.orthographicCamera);
  },
};

export const COMMAND_KEY_UNDO = "undo";
export const CommandUndo: Command<typeof COMMAND_KEY_UNDO, {step:number}> = {
  key: COMMAND_KEY_UNDO,
  modification: false,
  run(context, {step}) {
    context.commandSystem?.undo(step);
  },
};
