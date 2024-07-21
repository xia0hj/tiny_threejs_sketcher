import { Command } from "@src/features/command_system";
import { OperationMode } from "@src/features/operation_mode_switcher";
import {
  SketchObject,
  SketchObjectUserData,
} from "@src/features/sketch_object/type";
import { COMMAND_KEY } from "@src/index";
import { ThreeCadEditor } from "@src/three_cad_editor";
import assert from "assert";
import {
  BufferGeometry,
  Line,
  Material,
  Mesh,
  Plane,
  Vector2,
  Vector3,
} from "three";

class LineDrawer implements OperationMode {
  plane: Plane;
  startPoint?: Vector3 | null;
  previewLine2d = new Line2d();
  isStartPointFixed = false;
  threeCadEditor: ThreeCadEditor;

  constructor(planeObj: SketchObject, threeCadEditor: ThreeCadEditor) {
    if (planeObj === undefined || planeObj.userData.type !== "plane") {
      throw new Error("无法在非平面上绘制2d线段");
    }
    this.threeCadEditor = threeCadEditor;
    this.plane = new Plane(
      new Vector3(
        planeObj.userData.normal.x,
        planeObj.userData.normal.y,
        planeObj.userData.normal.z,
      ),
      planeObj.userData.constant,
    );

    threeCadEditor.orbitControls.enabled = false;
    threeCadEditor.globalStore.setState({
      curDrawingLine2dStartPoint: undefined,
      curDrawingLine2dEndPoint: undefined,
    });

    this.previewLine2d.visible = false;
    threeCadEditor.sketchObjectManager.addPreviewObject(this.previewLine2d);
  }

  onClick(event: PointerEvent, threeCadEditor: ThreeCadEditor) {
    if (this.startPoint && this.previewLine2d.userData.type === "line") {
      // 完成绘制
      this.startPoint = undefined;

      const line2d = new Line2d();
      line2d.updatePosition(
        new Vector3(
          this.previewLine2d.userData.startPoint.x,
          this.previewLine2d.userData.startPoint.y,
          this.previewLine2d.userData.startPoint.z,
        ),
        new Vector3(
          this.previewLine2d.userData.endPoint.x,
          this.previewLine2d.userData.endPoint.y,
          this.previewLine2d.userData.endPoint.z,
        ),
      );
      threeCadEditor.commandSystem.runCommand(COMMAND_KEY.add_line2d, {
        line2d,
      });

      this.previewLine2d.visible = false;
      threeCadEditor.globalStore.setState({
        curDrawingLine2dStartPoint: undefined,
        curDrawingLine2dEndPoint: undefined,
      });
      console.log("完成绘制线段", line2d);

      return;
    }

    // 开始绘制
    this.startPoint =
      threeCadEditor.sketchObjectManager.getIntersectPointOnPlane(
        event,
        this.plane,
      );
    if (this.startPoint == undefined) {
      return;
    }
    this.previewLine2d.updatePosition(this.startPoint, this.startPoint);
    this.previewLine2d.visible = true;
  }

  onPointermove(event: PointerEvent, threeCadEditor: ThreeCadEditor) {
    const curPoint =
      threeCadEditor.sketchObjectManager.getIntersectPointOnPlane(
        event,
        this.plane,
      );

    if (!curPoint) {
      return;
    }

    if (this.startPoint) {
      this.threeCadEditor.globalStore.setState({
        curDrawingLine2dEndPoint: curPoint,
      });
      this.previewLine2d.updatePosition(this.startPoint, curPoint);
    } else {
      this.threeCadEditor.globalStore.setState({
        curDrawingLine2dStartPoint: curPoint,
      });
    }
  }

  dispose() {
    this.previewLine2d.removeFromParent();
  }
}

export const commandStartDrawLine: Command<"start_draw_line"> = {
  key: "start_draw_line",
  modification: false,
  run(threeCadEditor) {
    const planeObj = threeCadEditor.globalStore.getState().sketcher2dBasePlane;

    if (planeObj === undefined) {
      throw new Error("未进入2d草图模式");
    }

    threeCadEditor.operationModeSwitcher.setOperationMode(
      new LineDrawer(planeObj, threeCadEditor),
    );
  },
};

export const commandAddLine2d = Object.freeze<Command<"add_line2d">>({
  key: "add_line2d",
  modification: true,
  run(threeCadEditor, { line2d }) {
    if (!(line2d instanceof Line2d)) {
      throw new Error("命令 add_line2d 参数有误");
    }

    threeCadEditor.sketchObjectManager.addObject2d(line2d);

    return {
      key: this.key,
      rollback() {
        line2d.removeFromParent();
      },
    };
  },
});

export const commandStopDrawLine: Command<"stop_draw_line"> = {
  key: "stop_draw_line",
  modification: false,
  run(threeCadEditor) {
    if (
      threeCadEditor.globalStore.getState().sketcher2dBasePlane === undefined
    ) {
      console.warn("未进入2d草图模式");
      return;
    }

    threeCadEditor.operationModeSwitcher.resetOperationMode();
  },
};

export class Line2d extends Line implements SketchObject {
  userData: SketchObjectUserData;

  constructor() {
    super();
    this.userData = {
      type: "line",
      startPoint: { x: 0, y: 0, z: 0 },
      endPoint: { x: 0, y: 0, z: 0 },
    };
  }

  updatePosition(startPoint: Vector3, endPoint: Vector3) {
    this.geometry.setFromPoints([startPoint, endPoint]);
    this.userData = {
      type: "line",
      startPoint: { x: startPoint.x, y: startPoint.y, z: startPoint.z },
      endPoint: { x: endPoint.x, y: endPoint.y, z: endPoint.z },
    };
  }

  dispose() {
    this.geometry.dispose();
    (this.material as Material).dispose();
  }
}
