import { CAMERA_TYPE } from "@src/constant/enum";
import { SketchObject } from "@src/sketch_object/type";
import { ValueOf } from "@src/util";

export type GlobalState = {
  selectedObjectList: SketchObject[];
  currentCameraType: ValueOf<typeof CAMERA_TYPE>
};

export class GlobalStore {
  private state: GlobalState;

  constructor() {
    this.state = {
      selectedObjectList: [],
      currentCameraType: CAMERA_TYPE.perspectiveCamera
    };
  }

  getState<K extends keyof GlobalState>(key: K): GlobalState[K] {
    return this.state[key];
  }

  setState<K extends keyof GlobalState>(key: K, val: GlobalState[K]) {
    this.state[key] = val
  }
}
