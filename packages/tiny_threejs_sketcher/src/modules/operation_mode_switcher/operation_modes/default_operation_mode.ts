import { MODULE_NAME, ModuleGetter } from "@src/modules/module_registry";
import { OperationMode } from "@src/modules/operation_mode_switcher";

export class DefaultOperationMode implements OperationMode {
  onClick(event: PointerEvent, getModule: ModuleGetter) {
    const sketchObjectManager = getModule(MODULE_NAME.SketchObjectManager);
    const stateStore = getModule(MODULE_NAME.StateStore);

    const intersectList = sketchObjectManager.getPointerIntersectList(event);
    if (!Array.isArray(intersectList) || intersectList.length === 0) {
      stateStore.setState({ selectedObjects: [] });
      return;
    }
    const firstIntersect = intersectList[0];
    firstIntersect.object.onSelect?.();
    console.log("选中了", firstIntersect.object);
    stateStore.setState({
      selectedObjects: [firstIntersect.object],
    });
  }
}