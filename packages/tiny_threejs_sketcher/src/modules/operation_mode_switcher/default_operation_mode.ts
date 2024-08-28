import { MODULE_NAME, ModuleGetter } from "@src/modules/module_registry";
import { CanvasInteractor } from "@src/modules/operation_mode_switcher";
import { logger } from "@src/utils/logger";

export class DefaultCanvasInteractor implements CanvasInteractor {
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
