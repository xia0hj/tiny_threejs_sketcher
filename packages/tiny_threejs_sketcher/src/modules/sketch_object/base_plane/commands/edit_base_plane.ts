import { MODULE_NAME, ModuleGetter } from "@src/modules/module_registry";
import { Command } from "@src/modules/command_executor";
import {
  commandErr,
  commandOk,
} from "@src/modules/command_executor/command_execution_result";

import { SKETCH_OBJECT_TYPE } from "@src/modules/sketch_object";

export class CommandStartEditBasePlane implements Command {
  name = "start_edit_base_plane";

  async execute(getModule: ModuleGetter) {
    const sketcherStore = getModule(MODULE_NAME.StateStore);

    const [selectedBasePlane] = sketcherStore.getState().selectedObjects;
    if (
      !selectedBasePlane ||
      selectedBasePlane.userData.type !== SKETCH_OBJECT_TYPE.basePlane
    ) {
      return commandErr(new Error("没有选中面"));
    }
    sketcherStore.setState({ editingBasePlane: selectedBasePlane });
    return commandOk(selectedBasePlane);
  }
}

export class CommandStopEditBasePlane implements Command {
  name = "stop_edit_base_plane";

  async execute(getModule: ModuleGetter) {
    const sketcherStore = getModule(MODULE_NAME.StateStore);

    if (sketcherStore.getState().editingBasePlane === undefined) {
      return commandErr(new Error("当前不是 2d 编辑模式"));
    }
    sketcherStore.setState({ editingBasePlane: undefined });
    return commandOk();
  }
}
