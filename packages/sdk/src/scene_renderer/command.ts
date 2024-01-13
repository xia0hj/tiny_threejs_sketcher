import { Command } from "@src/command_system/type";
import { CAMERA_TYPE } from "@src/constant/enum";

export const COMMAND_KEY_SET_PERSPECTIVE_CAMERA = "set_perspective_camera";
export const CommandSetPerspectiveCamera: Command = {
  key: COMMAND_KEY_SET_PERSPECTIVE_CAMERA,
  modification: false,
  run(context, commandParameter) {
    context.sceneRenderer?.setCameraType(CAMERA_TYPE.perspectiveCamera);
  },
};

export const COMMAND_KEY_SET_ORTHOGRAPHIC_CAMERA = "set_orthographic_camera";
export const CommandSetOrthographicCamera: Command = {
  key: COMMAND_KEY_SET_ORTHOGRAPHIC_CAMERA,
  modification: false,
  run(context, commandParameter) {
    context.sceneRenderer?.setCameraType(CAMERA_TYPE.orthographicCamera);
  },
};
