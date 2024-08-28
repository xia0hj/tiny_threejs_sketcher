import {
  CANVAS_INTERACTOR_NAME,
  CanvasInteractorNameUnion,
  MODULE_NAME,
  SKETCH_OBJECT_TYPE,
} from "@src/constant/enum";
import { CanvasInteractor } from "@src/modules/canvas_interactor_switcher";
import { ModuleGetter } from "@src/modules/module_registry";
import { BaseFace } from "@src/modules/sketch_object/base_face";
import { checkSketchObjectType } from "@src/utils";
import { Result, err, ok } from "neverthrow";
import { Intersection } from "three";

/**
 * @todo
 */
export class FaceSelector implements CanvasInteractor {
  name = CANVAS_INTERACTOR_NAME.face_selector;
  enter(getModule: ModuleGetter, prevInteractor: CanvasInteractorNameUnion) {
    if (prevInteractor !== CANVAS_INTERACTOR_NAME.default_viewer) {
      return err(
        new Error(`进入拉伸模式失败，只有在初始模式中才能进入拉伸模式`),
      );
    }

    return ok(undefined);
  }
  exit(getModule: ModuleGetter): Result<unknown, Error> {
    return getModule(MODULE_NAME.CanvasInteractorSwitcher).popInteractor();
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
