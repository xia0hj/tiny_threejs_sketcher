import { Command } from "@src/features/command_system";
import { OperationMode } from "@src/features/operation_mode_switcher";
import {
  SketchObject,
  SketchObjectUserData,
} from "@src/features/sketch_object/type";
import { ThreeCadEditor } from "@src/three_cad_editor";
import { BufferGeometry, Plane, Vector2, Vector3 } from "three";

class LineDrawer implements OperationMode {
  plane: Plane;
  startPoint?: Vector3 | null;
  planeObj: SketchObject;

  constructor(planeObj: SketchObject, line: Line) {
    if (planeObj === undefined || planeObj.userData.type !== "plane") {
      throw new Error("无法在非平面上绘制2d线段");
    }
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
      
    } else {
      // 开始绘制
      this.startPoint = threeCadEditor.sketchObjectManager.getIntersectPointOnPlane(event, this.plane);
    }
  }

  onPointermove(event: PointerEvent, threeCadEditor: ThreeCadEditor) {
    if(!this.startPoint) {
      return;
    }
  }
}

export const commandStartDrawLine: Command<"start_draw_line"> = {
  key: "start_draw_line",
  modification: false,
  run(threeCadEditor) {
    const planeObj = threeCadEditor.globalStore.getState("sketcher2dBasePlane");

    if (planeObj === undefined) {
      console.warn("未进入2d草图模式");
      return;
    }

    // todo: 关闭 orbitControls
    // todo: 此处创建 line，如何用 Mesh 表示线段？

    // const line = new Line(new BufferGeometry())

    threeCadEditor.operationModeSwitcher.setOperationMode(
      new LineDrawer(planeObj),
    );
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

export const commandCreateLine: Command<"create_line"> = {
  key: "create_line",
  modification: true,
  run(threeCadEditor, parameter) {
    return {
      key: this.key,
      parameter,
      rollback() {},
    };
  },
};

export type CreateLineParameter = {
  startPoint: { x: number; y: number; z: number };
  endPoint: { x: number; y: number; z: number };
};

export class Line extends SketchObject {
  userData: SketchObjectUserData;

  constructor(createLineParameter: CreateLineParameter) {
    super();
    this.userData = {
      type: "line",
      startPoint: { ...createLineParameter.startPoint },
      endPoint: { ...createLineParameter.endPoint },
    };
  }

  onMouseEnter(): void {
    throw new Error("Method not implemented.");
  }
  onMouseLeave(): void {
    throw new Error("Method not implemented.");
  }
  onSelect(): void {
    throw new Error("Method not implemented.");
  }
  onDeselect(): void {
    throw new Error("Method not implemented.");
  }
  dispose(): void {
    throw new Error("Method not implemented.");
  }
  updateCustomConfig(customConfig: { visible: boolean }): void {
    throw new Error("Method not implemented.");
  }
}
