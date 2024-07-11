import { Command } from "@src/features/command_system";
import { OperationMode } from "@src/features/operation_mode_switcher";
import {
  SketchObject,
  SketchObjectUserData,
} from "@src/features/sketch_object/type";
import { ThreeCadEditor } from "@src/three_cad_editor";
import { BufferGeometry, Line, Mesh, Plane, Vector2, Vector3 } from "three";

class LineDrawer implements OperationMode {
  plane: Plane;
  startPoint?: Vector3 | null;
  planeObj: SketchObject;
  line2d: Line2d;

  constructor(planeObj: SketchObject, line2d: Line2d) {
    if (planeObj === undefined || planeObj.userData.type !== "plane") {
      throw new Error("无法在非平面上绘制2d线段");
    }
    this.line2d = line2d;
    this.planeObj = planeObj;
    this.plane = new Plane(
      new Vector3(
        planeObj.userData.normal.x,
        planeObj.userData.normal.y,
        planeObj.userData.normal.z,
      ),
      planeObj.userData.constant,
    );
  }

  onClick(event: PointerEvent, threeCadEditor: ThreeCadEditor) {
    if (this.startPoint) {
      // 完成绘制
      this.startPoint = undefined;
      threeCadEditor.commandSystem.runCommand("stop_draw_line");
      return;
    }

    this.startPoint =
      threeCadEditor.sketchObjectManager.getIntersectPointOnPlane(
        event,
        this.plane,
      );
    if (this.startPoint == undefined) {
      return;
    }

    // 开始绘制
    this.line2d.updatePosition(this.startPoint, this.startPoint);
  }

  onPointermove(event: PointerEvent, threeCadEditor: ThreeCadEditor) {
    if (this.startPoint == null) {
      return;
    }

    const endPoint =
      threeCadEditor.sketchObjectManager.getIntersectPointOnPlane(
        event,
        this.plane,
      );

    if (endPoint != undefined) {
      this.line2d.updatePosition(this.startPoint, endPoint);
    }
  }
}

export const commandStartDrawLine: Command<"start_draw_line"> = {
  key: "start_draw_line",
  modification: true,
  run(threeCadEditor) {
    const planeObj = threeCadEditor.globalStore.getState("sketcher2dBasePlane");

    if (planeObj === undefined) {
      throw new Error("未进入2d草图模式");
    }

    const line2d = new Line2d();
    planeObj.add(line2d);

    threeCadEditor.orbitControls.enabled = false;
    threeCadEditor.operationModeSwitcher.setOperationMode(
      new LineDrawer(planeObj, line2d),
    );

    return {
      key: this.key,
      rollback() {
        line2d.removeFromParent();
      },
    };
  },
};

export const commandStopDrawLine: Command<"stop_draw_line"> = {
  key: "stop_draw_line",
  modification: false,
  run(threeCadEditor) {
    if (
      threeCadEditor.globalStore.getState("sketcher2dBasePlane") === undefined
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
}
