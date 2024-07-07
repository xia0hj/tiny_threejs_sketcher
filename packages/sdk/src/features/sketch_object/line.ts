import {
  SketchObject,
  SketchObjectUserData,
} from "@src/features/sketch_object/type";

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
