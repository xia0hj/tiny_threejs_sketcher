import { Command } from "@src/features/command_system";
import { OperationMode } from "@src/features/operation_mode_switcher";
import { SketchObject } from "@src/features/sketch_object/type";
import { ThreeCadEditor } from "@src/three_cad_editor";
import { Plane, Vector3 } from "three";

export const commandEnterSketcher2d: Command<"enter_sketcher_2d"> = {
  key: "enter_sketcher_2d",
  modification: false,
  run(threeCadEditor, parameter: SketchObject) {
    // if (parameter.userData.type !== "plane") {
    //   console.warn("没有选中面");
    //   return;
    // }
    // threeCadEditor.globalStore.setState("sketcher2dBasePlane", parameter);

    threeCadEditor.globalStore.setState({
      sketcher2dBasePlane:
        threeCadEditor.globalStore.getState().selectedObjectList[0],
    });
  },
};

export const commandExitSketcher2d: Command<"exit_sketcher_2d"> = {
  key: "exit_sketcher_2d",
  modification: false,
  run(threeCadEditor) {
    if (
      threeCadEditor.globalStore.getState().sketcher2dBasePlane === undefined
    ) {
      console.warn("当前不是 2d 编辑模式");
    }
    threeCadEditor.globalStore.setState({ sketcher2dBasePlane: undefined });
  },
};
