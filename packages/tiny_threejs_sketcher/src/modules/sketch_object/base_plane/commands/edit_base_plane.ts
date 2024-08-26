import { MODULE_NAME, ModuleGetter } from "@src/modules/module_registry";
import { Command } from "@src/modules/command_executor";
import {
  commandErr,
  commandOk,
} from "@src/modules/command_executor/command_execution_result";

import { checkSketchObjectType } from "@src/utils";
import { SKETCH_OBJECT_TYPE } from "@src/constant/enum";
import { EditPlaneMode } from "@src/modules/sketch_object/base_plane/operation_modes/edit_plane_mode";
import { DefaultOperationMode } from "@src/modules/operation_mode_switcher/operation_modes/default_operation_mode";

export class CommandStartEditBasePlane implements Command {
  name = "start_edit_base_plane";

  async execute(getModule: ModuleGetter) {
    const sketcherStore = getModule(MODULE_NAME.StateStore);

    const [selectedBasePlane] = sketcherStore.getState().selectedObjects;
    if (
      !checkSketchObjectType(selectedBasePlane, SKETCH_OBJECT_TYPE.base_plane)
    ) {
      return commandErr(new Error("没有选中面"));
    }
    sketcherStore.setState({ editingBasePlane: selectedBasePlane });
    return commandOk(selectedBasePlane);
  }
}

export class CommandResetEditPlaneMode implements Command {
  name = "reset_edit_plane_mode";

  async execute(getModule: ModuleGetter) {
    const operationModeSwitcher = getModule(MODULE_NAME.OperationModeSwitcher);
    operationModeSwitcher.setOperationMode(new EditPlaneMode());
    return commandOk();
  }
}

export class CommandStopEditBasePlane implements Command {
  name = "stop_edit_base_plane";

  async execute(getModule: ModuleGetter) {
    const sketcherStore = getModule(MODULE_NAME.StateStore);
    const plane = sketcherStore.getState().editingBasePlane;

    if (plane == undefined) {
      return commandErr(new Error("当前不是 2d 编辑模式"));
    }
    sketcherStore.setState({ editingBasePlane: undefined });
    plane.onDeselect();

    getModule(MODULE_NAME.OperationModeSwitcher).setOperationMode(
      new DefaultOperationMode(),
    );

    return commandOk();
  }
}
