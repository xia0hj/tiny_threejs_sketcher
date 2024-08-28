import { SKETCH_OBJECT_TYPE } from "@src/index";
import { Command } from "@src/modules/command_executor";
import {
  commandErr,
  commandOk,
} from "@src/modules/command_executor/command_execution_result";
import { MODULE_NAME, ModuleGetter } from "@src/modules/module_registry";
import { CommandResetEditPlaneMode } from "@src/modules/sketch_object/base_plane/commands/edit_base_plane";
import { Line2d } from "@src/modules/sketch_object/line2d";
import { LineDrawer } from "@src/modules/sketch_object/line2d/line_drawer";
import { checkSketchObjectType } from "@src/utils";

export class CommandStartDrawLine implements Command {
  name = "start_draw_line";

  async execute(getModule: ModuleGetter) {
    const basePlane = getModule(MODULE_NAME.StateStore).getState()
      .editingBasePlane;
    if (basePlane == null) {
      return commandErr(new Error("无法在非平面上绘制2d线段"));
    }

    getModule(MODULE_NAME.CanvasInteractorSwitcher).setOperationMode(
      new LineDrawer(getModule),
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
    if (!checkSketchObjectType(this.line2d, SKETCH_OBJECT_TYPE.line2d)) {
      return commandErr(
        new Error(
          `命令 ${this.name} 无法添加非 ${SKETCH_OBJECT_TYPE.line2d} 对象`,
        ),
      );
    }
    getModule(MODULE_NAME.SketchObjectManager).addObject2d(this.line2d);
    return commandOk(this.line2d);
  }

  async undo() {
    this.line2d.removeFromParent();
    this.line2d.dispose();
    return commandOk();
  }
}

export class CommandStopDrawLine extends CommandResetEditPlaneMode {
  name = "stop_draw_line";
}
