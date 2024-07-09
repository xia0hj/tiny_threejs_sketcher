import { CAMERA_TYPE } from "@src/constant/enum";
import { SketchObject } from "@src/features/sketch_object/type";
import { SketchObjectTreeItem } from "@src/features/sketch_object_manager";
import { ValueOf } from "@src/util";

export type GlobalState = {
  selectedObjectList: SketchObject[];
  currentCameraType: ValueOf<typeof CAMERA_TYPE>;
  sketchObjectTreeRoot?: SketchObjectTreeItem;

  /** 用于区分是否处于 2d 草图模式 */
  sketcher2dBasePlane?: SketchObject;
};

export type GlobalStateWatcher = {
  [K in keyof GlobalState]?: (newVal: GlobalState[K]) => void;
};

export class GlobalStore {
  private state: GlobalState;
  private watchers?: GlobalStateWatcher[];

  constructor(watchers?: GlobalStateWatcher[]) {
    this.state = {
      selectedObjectList: [],
      currentCameraType: CAMERA_TYPE.perspectiveCamera,
    };
    this.watchers = watchers;
  }

  getState<K extends keyof GlobalState>(key: K): GlobalState[K] {
    return this.state[key];
  }

  setState<K extends keyof GlobalState>(key: K, val: GlobalState[K]) {
    this.state[key] = val;
    this.watchers?.forEach(watcher => watcher?.[key]?.(val));
  }
}
