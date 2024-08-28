import {
  CANVAS_INTERACTOR_NAME,
  CanvasInteractorNameUnion,
  MODULE_NAME,
  SKETCH_OBJECT_TYPE,
} from "@src/constant/enum";
import { CanvasInteractor } from "@src/modules/canvas_interactor_switcher";
import { ModuleGetter } from "@src/modules/module_registry";
import { BaseFace } from "@src/modules/sketch_object/base_face";
import { BasePlane } from "@src/modules/sketch_object/base_plane";
import { checkSketchObjectType } from "@src/utils";
import { logger } from "@src/utils/logger";
import { Result, err, ok } from "neverthrow";
import { CircleGeometry, Vector3 } from "three";

export class PlaneEditor implements CanvasInteractor {
  name = CANVAS_INTERACTOR_NAME.plane_editor;
  plane!: BasePlane;

  enter(getModule: ModuleGetter, prevInteractor: CanvasInteractorNameUnion) {
    if (prevInteractor !== CANVAS_INTERACTOR_NAME.default_viewer) {
      return err(new Error(`${this.name} 入栈失败，前置状态不正确`));
    }

    const sketcherStore = getModule(MODULE_NAME.StateStore);
    const [selectedBasePlane] = sketcherStore.getState().selectedObjects;
    if (
      !checkSketchObjectType(selectedBasePlane, SKETCH_OBJECT_TYPE.base_plane)
    ) {
      return err(new Error("没有选中面"));
    }
    sketcherStore.setState({ editingBasePlane: selectedBasePlane });
    this.plane = selectedBasePlane;
    return ok(selectedBasePlane);
  }
  exit(getModule: ModuleGetter): Result<unknown, Error> {
    this.plane.onDeselect();
    getModule(MODULE_NAME.StateStore).setState({ editingBasePlane: undefined });

    const faces = buildFaceOnPlane(this.plane);
    logger.info("退出平面编辑模式", { plane: this.plane, faces });
    getModule(MODULE_NAME.SketchObjectManager).add(...faces);
    return ok({ plane: this.plane, faces });
  }
}

function buildFaceOnPlane(plane: BasePlane) {
  const resultFaces: BaseFace[] = [];
  plane.children.forEach((obj2d) => {
    if (checkSketchObjectType(obj2d, SKETCH_OBJECT_TYPE.circle2d)) {
      const geometry = new CircleGeometry(obj2d.userData.radius);
      const face = new BaseFace(
        geometry,
        new Vector3().fromArray(plane.userData.normal),
      );
      face.position.copy(obj2d.position);
      resultFaces.push(face);
    }
  });

  return resultFaces;
}
