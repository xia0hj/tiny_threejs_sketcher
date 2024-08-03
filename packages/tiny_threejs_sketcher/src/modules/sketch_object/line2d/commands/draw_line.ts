import { Command } from "@src/modules/command_executor";
import {
  CommandExecutionResult,
  commandErr,
  commandOk,
} from "@src/modules/command_executor/command_execution_result";
import { MODULE_NAME, ModuleGetter } from "@src/modules/module_registry";
import { Line2d } from "@src/modules/sketch_object/line2d";
import { LineDrawer } from "@src/modules/sketch_object/line2d/line_drawer";
import { checkIsSketchObject } from "@src/utils";

export class CommandStartDrawLine implements Command {
  name = "start_draw_line";

  async execute(getModule: ModuleGetter) {
    const basePlane = getModule(MODULE_NAME.StateStore).getState()
      .editingBasePlane;
    if (basePlane == null) {
      return commandErr(new Error("无法在非平面上绘制2d线段"));
    }

    getModule(MODULE_NAME.OperationModeSwitcher).setOperationMode(
      new LineDrawer(),
    );

    return commandOk();
  }
}

export class CommandAddLine implements Command {
  name = "add_line";

  line2d: Line2d;

  constructor(line2d: Line2d) {
    this.line2d = line2d;
  }

  async execute(getModule: ModuleGetter) {
    if (!checkIsSketchObject(this.line2d)) {
      return commandErr(new Error("命令 add_line2d 无法添加非 line2d 对象"));
    }
    getModule(MODULE_NAME.SketchObjectManager).addObject2d(this.line2d);
    return commandOk(this.line2d);
  }
}

