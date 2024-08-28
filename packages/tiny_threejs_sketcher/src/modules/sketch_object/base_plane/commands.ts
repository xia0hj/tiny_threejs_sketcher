import { Command } from "@src/modules/command_executor";
import { MODULE_NAME, ModuleGetter } from "@src/modules/module_registry";
import {
  BasePlane,
  CreateBasePlaneParameter,
} from "@src/modules/sketch_object/base_plane";
import { PlaneEditor } from "@src/modules/sketch_object/base_plane/plane_editor";
import { ok } from "neverthrow";

/**
 * @exports
 */
export class CommandEnablePlaneEditor implements Command {
  name = "enable_plane_editor";
  execute(getModule: ModuleGetter) {
    return getModule(MODULE_NAME.CanvasInteractorSwitcher).pushInteractor(
      new PlaneEditor(),
    );
  }
}

/**
 * @exports
 */
export class CommandCreateBasePlane implements Command {
  name = "create_base_plane";

  parameter: CreateBasePlaneParameter;
  plane!: BasePlane;

  constructor(parameter: CreateBasePlaneParameter) {
    this.parameter = parameter;
  }

  execute(getModule: ModuleGetter) {
    this.plane = new BasePlane(this.parameter);
    getModule(MODULE_NAME.SketchObjectManager).add(this.plane);
    return ok(this.plane);
  }

  undo() {
    this.plane.dispose();
    return ok(undefined);
  }
}
