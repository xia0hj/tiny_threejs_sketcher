import { SKETCH_OBJECT_TYPE } from "@src/index";
import { Command } from "@src/modules/command_executor";
import {
  CommandExecutionResult,
  commandErr,
  commandOk,
} from "@src/modules/command_executor/command_execution_result";
import { MODULE_NAME, ModuleGetter } from "@src/modules/module_registry";
import { OperationMode } from "@src/modules/operation_mode_switcher";
import { DefaultOperationMode } from "@src/modules/operation_mode_switcher/operation_modes/default_operation_mode";
import { BaseFace } from "@src/modules/sketch_object/base_face";
import { Solid } from "@src/modules/sketch_object/solid";
import { checkSketchObjectType } from "@src/utils";
import { logger } from "@src/utils/logger";
import { Intersection } from "three";

export class CommandStartExtrudeFromFace implements Command {
  name = "start_extrude_from_face";

  async execute(getModule: ModuleGetter) {
    const [face] = getModule(MODULE_NAME.StateStore).getState().selectedObjects;
    if (!checkSketchObjectType(face, SKETCH_OBJECT_TYPE.base_face)) {
      return commandErr(new Error("111"));
    }
    const solid = new Solid(face, 10);
    getModule(MODULE_NAME.SketchObjectManager).add(solid);

    return commandOk();
  }
}

export class CommandStartSelectExtrudeFace implements Command {
  name = "start_select_extrude_face";

  async execute(getModule: ModuleGetter) {
    getModule(MODULE_NAME.OperationModeSwitcher).setOperationMode(
      new SelectFaceOperationMode(getModule),
    );
    return commandOk();
  }
}

export class CommandStopSelectExtrudeFace implements Command {
  name = "stop_select_extrude_face";

  depth: number;

  constructor(depth: number) {
    this.depth = depth;
  }

  async execute(getModule: ModuleGetter) {
    const stateStore = getModule(MODULE_NAME.StateStore);
    const [face] = stateStore.getState().selectedObjects;
    if (!checkSketchObjectType(face, SKETCH_OBJECT_TYPE.base_face)) {
      return commandOk();
    }
    const solid = new Solid(face, this.depth);
    getModule(MODULE_NAME.SketchObjectManager).add(solid);

    logger.info("拉伸成功", { face, solid });

    getModule(MODULE_NAME.OperationModeSwitcher).setOperationMode(
      new DefaultOperationMode(),
    );

    return commandOk();
  }
}

class SelectFaceOperationMode implements OperationMode {
  constructor(getModule: ModuleGetter) {
    const stateStore = getModule(MODULE_NAME.StateStore);
    stateStore.setState({ selectedObjects: [] });
  }

  onClick(event: PointerEvent, getModule: ModuleGetter): void {
    const sketchObjectManager = getModule(MODULE_NAME.SketchObjectManager);
    const intersectFace = sketchObjectManager
      .getPointerIntersectArray(event)
      ?.find((intersect) =>
        checkSketchObjectType(intersect.object, SKETCH_OBJECT_TYPE.base_face),
      ) as Intersection<BaseFace> | undefined;

    if (!intersectFace) {
      return;
    }

    getModule(MODULE_NAME.StateStore).setState({
      selectedObjects: [intersectFace.object],
    });
  }
}
