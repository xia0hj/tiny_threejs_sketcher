import { MODULE_NAME, ModuleGetter } from "@src/modules/module_registry";
import { Command } from "@src/modules/command_executor";
import {
  commandErr,
  commandOk,
} from "@src/modules/command_executor/command_execution_result";

import {
  CreateBasePlaneParameter,
  BasePlane,
} from "@src/modules/sketch_object/base_plane";

export class CommandCreateBasePlane implements Command {
  name = "create_base_plane";

  parameter;
  plane?: BasePlane;

  constructor(
    parameter: Pick<CreateBasePlaneParameter, "offset" | "parallelTo">,
  ) {
    this.parameter = parameter;
  }

  async execute(getModule: ModuleGetter) {
    const { planeColor, planeLength, planeOpacity, planeSelectColor } =
      getModule(MODULE_NAME.Configurator).getOptions();
    const defaultParameter: CreateBasePlaneParameter = {
      offset: 0,
      parallelTo: "XY",
      planeColor,
      planeSelectColor,
      planeLength,
      planeOpacity,
    };
    const mergedParameter = Object.assign(defaultParameter, this.parameter);

    this.plane = new BasePlane(mergedParameter);
    getModule(MODULE_NAME.SketchObjectManager).add(this.plane);
    return commandOk(this.plane);
  }

  async undo() {
    if (this.plane == null) {
      return commandErr(new Error("can not get plane when undo command"));
    }

    this.plane.removeFromParent();
    this.plane.dispose();
    return commandOk();
  }
}
