import { SKETCH_OBJECT_TYPE } from "@src/index";
import { Command } from "@src/modules/command_executor";
import {
  commandErr,
  commandOk,
} from "@src/modules/command_executor/command_execution_result";
import { MODULE_NAME, ModuleGetter } from "@src/modules/module_registry";
import { CommandResetEditPlaneMode } from "@src/modules/sketch_object/base_plane/commands/edit_base_plane";
import { Circle2d } from "@src/modules/sketch_object/circle2d";
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

export class CommandAddCircle implements Command {
  name = "add_circle";

  circle2d: Circle2d;

  constructor(circle2d: Circle2d) {
    this.circle2d = circle2d;
  }

  async execute(getModule: ModuleGetter) {
    if (!checkSketchObjectType(this.circle2d, SKETCH_OBJECT_TYPE.circle2d)) {
      return commandErr(
        new Error(
          `命令 ${this.name} 无法添加非 ${SKETCH_OBJECT_TYPE.circle2d} 对象`,
        ),
      );
    }
    getModule(MODULE_NAME.SketchObjectManager).addObject2d(this.circle2d);
    return commandOk(this.circle2d);
  }

  async undo() {
    this.circle2d.removeFromParent();
    this.circle2d.dispose();
    return commandOk();
  }
}

export class CommandStopDrawCircle extends CommandResetEditPlaneMode {
  name = "stop_draw_circle";
}
