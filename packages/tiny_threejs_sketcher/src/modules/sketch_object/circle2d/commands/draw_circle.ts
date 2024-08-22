import { SKETCH_OBJECT_TYPE } from "@src/index";
import { Command } from "@src/modules/command_executor";
import {
  CommandExecutionResult,
  commandErr,
  commandOk,
} from "@src/modules/command_executor/command_execution_result";
import { MODULE_NAME, ModuleGetter } from "@src/modules/module_registry";
import { CircleDrawer } from "@src/modules/sketch_object/circle2d/circle_drawer";
import { checkSketchObjectType } from "@src/utils";
import { logger } from "@src/utils/logger";

export class CommandStartDrawCircle implements Command {
  name = "start_draw_circle";

  async execute(getModule: ModuleGetter) {
    const plane = getModule(MODULE_NAME.StateStore).getState().editingBasePlane;
    if (!checkSketchObjectType(plane, SKETCH_OBJECT_TYPE.base_plane)) {
      logger.warn("非2d编辑模式无法绘制圆");
      return commandErr(new Error("非2d编辑模式无法绘制圆"));
    }
    getModule(MODULE_NAME.OperationModeSwitcher).setOperationMode(
      new CircleDrawer(getModule),
    );
    return commandOk();
  }
}
