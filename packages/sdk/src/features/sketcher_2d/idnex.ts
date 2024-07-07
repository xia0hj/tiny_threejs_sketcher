import { Command } from "@src/features/command_system";
import { OperationMode } from "@src/features/operation_mode_switcher";
import { SketchObject } from "@src/features/sketch_object/type";
import { ThreeCadEditor } from "@src/three_cad_editor";

export const commandEnterSketcher2d: Command<"enter_sketcher_2d"> = {
  key: "enter_sketcher_2d",
  modification: true,
  run(threeCadEditor, parameter) {
    return {
      key: this.key,
      parameter,
      rollback() {},
    };
  },
};

const sketcher2dOperationMode = Object.freeze<OperationMode>({});

export class Sketcher2d {
  private threeCadEditor: ThreeCadEditor;

  private plane?: SketchObject;

  constructor(threeCadEditor: ThreeCadEditor) {
    this.threeCadEditor = threeCadEditor;
  }

  enter() {
    const selectedObjectList =
      this.threeCadEditor.globalStore.getState("selectedObjectList");
    if (
      selectedObjectList.length !== 1 ||
      selectedObjectList[0].userData.type !== "plane"
    ) {
      console.warn("没有选中面");
      this.threeCadEditor.globalStore.setState("isSketcher2dMode", false);
      return;
    }

    this.threeCadEditor.globalStore.setState("isSketcher2dMode", true);
    this.threeCadEditor.operationModeSwitcher.setOperationMode(
      sketcher2dOperationMode,
    );
    this.plane = selectedObjectList[0];
  }

  exit() {
    this.plane = undefined;
    this.threeCadEditor.operationModeSwitcher.resetOperationMode();
    this.threeCadEditor.globalStore.setState("isSketcher2dMode", false);
  }
}
