import { CONFIG_VARS } from "@src/constant/config";
import { SKETCH_OBJECT_TYPE } from "@src/constant/enum";
import { MODULE_NAME, ModuleGetter } from "@src/modules/module_registry";
import { OperationMode } from "@src/modules/operation_mode_switcher";
import { Line2d } from "@src/modules/sketch_object/line2d";
import { CommandAddLine } from "@src/modules/sketch_object/line2d/commands/draw_line";
import { checkSketchObjectType } from "@src/utils";
import { logger } from "@src/utils/logger";
import { Plane, Vector3 } from "three";

export class LineDrawer implements OperationMode {
  previewLine2d = new Line2d();

  startPoint: Vector3 | null | undefined;

  plane: Plane;

  constructor(getModule: ModuleGetter) {
    const stateStore = getModule(MODULE_NAME.StateStore);
    const { editingBasePlane } = stateStore.getState();
    if (
      !checkSketchObjectType(editingBasePlane, SKETCH_OBJECT_TYPE.base_plane)
    ) {
      throw new Error("无法在非平面上绘制2d线段");
    }
    this.plane = new Plane(
      new Vector3().fromArray(editingBasePlane.userData.normal),
      editingBasePlane.userData.constant,
    );

    stateStore.setState({
      drawingLine2dStartPoint: undefined,
      drawingLine2dEndPoint: undefined,
    });

    getModule(MODULE_NAME.SketchObjectManager).addPreviewObject(
      this.previewLine2d,
    );
  }

  async onClick(event: PointerEvent, getModule: ModuleGetter) {
    // 起始点已存在，本次点击完成绘制
    if (this.startPoint) {
      const line2d = new Line2d();
      line2d.updatePosition(
        new Vector3().fromArray(this.previewLine2d.userData.startPosition),
        new Vector3().fromArray(this.previewLine2d.userData.endPosition),
      );

      const result = await getModule(
        MODULE_NAME.CommandExecutor,
      ).executeCommand(new CommandAddLine(line2d));
      result.match(
        () => {
          this.startPoint = undefined;
          this.previewLine2d.visible = false;
          getModule(MODULE_NAME.StateStore).setState({
            drawingLine2dStartPoint: undefined,
            drawingLine2dEndPoint: undefined,
          });

          logger.info("完成绘制线段", line2d);
        },
        () => {},
      );
      return;
    }

    // 起始点不存在，本次点击固定起始点
    this.startPoint = getModule(
      MODULE_NAME.SketchObjectManager,
    ).getIntersectPointOnPlane(event, this.plane);
    if (!this.startPoint) {
      return;
    }
    this.previewLine2d.updatePosition(this.startPoint, this.startPoint);
    this.previewLine2d.visible = true;
  }

  onPointermove(event: PointerEvent, getModule: ModuleGetter) {
    const curPoint = getModule(
      MODULE_NAME.SketchObjectManager,
    ).getIntersectPointOnPlane(event, this.plane);
    if (!curPoint) {
      return;
    }

    const stateStore = getModule(MODULE_NAME.StateStore);
    if (this.startPoint) {
      stateStore.setState({
        drawingLine2dEndPoint: curPoint,
      });
      this.previewLine2d.updatePosition(this.startPoint, curPoint);
    } else {
      stateStore.setState({
        drawingLine2dStartPoint: curPoint,
      });
    }
  }

  dispose() {
    this.previewLine2d.removeFromParent();
    this.previewLine2d.dispose();
  }
}
