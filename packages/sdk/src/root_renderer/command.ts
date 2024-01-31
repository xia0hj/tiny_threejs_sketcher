import { Command } from "@src/command_system";
import { CAMERA_TYPE, SKETCH_OBJECT_TYPE } from "@src/constant/enum";

export const CommandSetPerspectiveCamera: Command<"set_perspective_camera"> = {
  key: "set_perspective_camera",
  modification: false,
  run(rootRenderer) {
    rootRenderer.setCameraType(CAMERA_TYPE.perspectiveCamera);
  },
};

export const CommandSetOrthographicCamera: Command<"set_orthographic_camera"> =
  {
    key: "set_orthographic_camera",
    modification: false,
    run(rootRenderer) {
      rootRenderer.setCameraType(CAMERA_TYPE.orthographicCamera);
    },
  };

export const CommandUndo: Command<"undo", { step: number }> = {
  key: "undo",
  modification: false,
  run(rootRenderer, { step }) {
    rootRenderer.commandSystem.undo(step);
  },
};

export const CommandFitCameraToScene: Command<"fitCameraToScene"> = {
  key: "fitCameraToScene",
  modification: false,
  run(rootRenderer) {
    rootRenderer.fitCameraToScene();
  },
};

export const CommandEditSketchPlane: Command<'editSketchPlane'> = {
  key:'editSketchPlane',
  modification: false,
  run(rootRenderer) {
    const selectedObjectList = rootRenderer.sketchObjectManager.selectedObjectList
    if(selectedObjectList.length !== 1 || selectedObjectList[0].type !== SKETCH_OBJECT_TYPE.plane){
      console.error('选择的不是草图平面')
    }
  },
}
