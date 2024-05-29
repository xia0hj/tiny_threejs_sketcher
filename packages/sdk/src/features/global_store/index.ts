import { CAMERA_TYPE } from "@src/constant/enum";
import { SketchObject } from "@src/features/sketch_object/type";
import { SketchObjectTreeItem } from "@src/features/sketch_object_manager";
import { ValueOf } from "@src/util";

export type GlobalState = {
  selectedObjectList: SketchObject[];
  currentCameraType: ValueOf<typeof CAMERA_TYPE>;
  sketchObjectTree?: SketchObjectTreeItem;
};

export type GlobalStateWatcher = {
  [K in keyof GlobalState]?: (newVal: GlobalState[K]) => void;
};

export class GlobalStore {
  private state: GlobalState;
  private watcher?: GlobalStateWatcher;

  constructor(watcher?: GlobalStateWatcher) {
    this.state = {
      selectedObjectList: [],
      currentCameraType: CAMERA_TYPE.perspectiveCamera,
    };
    this.watcher = watcher;
  }

  getState<K extends keyof GlobalState>(key: K): GlobalState[K] {
    return this.state[key];
  }

  setState<K extends keyof GlobalState>(key: K, val: GlobalState[K]) {
    this.state[key] = val;
    this.watcher?.[key]?.(val);
  }
}
