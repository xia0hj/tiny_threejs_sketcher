import { MODULE_NAME, ModuleGetter } from "@src/modules/module_registry";
import { Controller } from "@src/modules/controller_switcher";
import { logger } from "@src/utils/logger";
import { CONTROLLER_NAME } from "@src/constant/enum";
import { Result, err, ok } from "neverthrow";

export class DefaultViewer implements Controller {
  name = CONTROLLER_NAME.default_viewer;
  prev = CONTROLLER_NAME.default_viewer;

  enter() {
    return ok(undefined);
  }

  exit(): Result<unknown, Error> {
    return err(new Error("不能退出默认的 canvas interactor"));
  }

  onClick(event: PointerEvent, getModule: ModuleGetter) {
    const sketchObjectManager = getModule(MODULE_NAME.SketchObjectManager);
    const stateStore = getModule(MODULE_NAME.StateStore);

    const intersectList = sketchObjectManager.getPointerIntersectArray(event);
    if (!Array.isArray(intersectList) || intersectList.length === 0) {
      const prevSelected = stateStore.getState().selectedObjects;
      prevSelected.forEach((obj) => obj.onDeselect?.());
      stateStore.setState({ selectedObjects: [] });
      return;
    }
    const firstIntersect = intersectList[0];
    firstIntersect.object.onSelect?.();
    logger.info("选中了", firstIntersect.object);
    stateStore.setState({
      selectedObjects: [firstIntersect.object],
    });
  }
}
