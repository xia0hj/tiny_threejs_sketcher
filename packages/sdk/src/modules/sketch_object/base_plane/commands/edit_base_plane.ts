import { MODULE_NAME, ModuleGetter } from "@src/modules";
import { Command } from "@src/modules/command_system";
import { SKETCH_OBJECT_TYPE } from "@src/modules/sketch_object";
import { BasePlane } from "@src/modules/sketch_object/base_plane";

export const commandStartEditBasePlane: Command<"start_edit_base_plane"> = {
  key: "start_edit_base_plane",
  modification: false,
  run(getModule: ModuleGetter) {
    const globalStore = getModule(MODULE_NAME.GlobalStore);

    const [selectedBasePlane] = globalStore.getState().selectedObjects;
    if (
      !selectedBasePlane ||
      selectedBasePlane.userData.type !== SKETCH_OBJECT_TYPE.basePlane
    ) {
      console.warn("没有选中面");
      return;
    }
    globalStore.setState({ editingBasePlane: selectedBasePlane });
  },
};

export const commandStopEditBasePlane: Command<"stop_edit_base_plane"> = {
  key: "stop_edit_base_plane",
  modification: false,
  run(getModule: ModuleGetter) {
    const globalStore = getModule(MODULE_NAME.GlobalStore);

    if (globalStore.getState().editingBasePlane === undefined) {
      console.warn("当前不是 2d 编辑模式");
    }
    globalStore.setState({ editingBasePlane: undefined });
  },
};
