import { CAMERA_TYPE } from "@src/constant/enum";
import { MODULE_NAME, Module } from "@src/modules";
import { SketchObject } from "@src/modules/sketch_object";
import { SketchObjectTreeItem } from "@src/modules/sketch_object_manager";
import { ValueOf } from "@src/utils";
import mitt from "mitt";

export type GlobalState = {
  curCameraType: ValueOf<typeof CAMERA_TYPE>;
  sketchObjectTreeRoot?: SketchObjectTreeItem;
  selectedObjects: SketchObject[];

  /** 用于区分是否处于 2d 草图模式 */
  editingBasePlane?: SketchObject;
};


export class GlobalStore implements Module {
  name = MODULE_NAME.GlobalStore;
  emitter = mitt<GlobalState>();

  state: GlobalState = {
    curCameraType: CAMERA_TYPE.perspectiveCamera,
    selectedObjects: [],
  }

  public getState(): GlobalState {
    return this.state;
  }

  public setState(state: Partial<GlobalState>) {
    Object.entries(state).forEach(([key, value]) => {
      this.state[key as keyof GlobalState] = value as any;
      this.emitter.emit(key as keyof GlobalState, value);
    });
  }

  public getEmitter() {
    return this.emitter;
  }

  dispose() {
    this.emitter.all.clear();
  }
}
