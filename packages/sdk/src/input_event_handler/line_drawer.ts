import { DefaultInputEventHandler } from "@src/input_event_handler/default";
import { InputEventHandler } from "@src/input_event_handler/interface";
import { RootRenderer } from "@src/root_renderer";
import { BufferGeometry, Line, Object3D, Plane, Vector2, Vector3 } from "three";

export class LineDrawer implements InputEventHandler {
  plane: Plane;
  isDrawing = false;
  line = new Line(new BufferGeometry());
  startPoint = new Vector3();

  constructor(
    planeNormal: { x: number; y: number; z: number },
    planeConstant: number,
    parentObject: Object3D,
  ) {
    this.plane = new Plane(
      new Vector3(planeNormal.x, planeNormal.y, planeNormal.z),
      planeConstant,
    );
    parentObject.add(this.line);
  }

  onPointerdown(event: MouseEvent, rootRenderer: RootRenderer) {
    if (this.isDrawing) {
      // 停止绘制
      this.isDrawing = false;
      rootRenderer.orbitControls.enabled = true;
      rootRenderer.inputEventHandler = new DefaultInputEventHandler();
    } else {
      // 开始绘制
      rootRenderer.raycaster.setFromCamera(
        new Vector2(
          (event.offsetX / rootRenderer.canvasElement.width) * 2 - 1,
          -(event.offsetY / rootRenderer.canvasElement.height) * 2 + 1,
        ),
        rootRenderer.camera,
      );
      rootRenderer.raycaster.ray.intersectPlane(this.plane, this.startPoint);
      this.isDrawing = true;
    }
  }

  onPointermove(event: MouseEvent, rootRenderer: RootRenderer) {
    if (!this.isDrawing) {
      return;
    }

    rootRenderer.raycaster.setFromCamera(
      new Vector2(
        (event.offsetX / rootRenderer.canvasElement.width) * 2 - 1,
        -(event.offsetY / rootRenderer.canvasElement.height) * 2 + 1,
      ),
      rootRenderer.camera,
    );
    const endPoint = rootRenderer.raycaster.ray.intersectPlane(
      this.plane,
      new Vector3(),
    );
    if (endPoint == undefined) {
      throw new Error("endPoint == undefined");
    }
    this.line.geometry.setFromPoints([this.startPoint, endPoint]);
  }
}
