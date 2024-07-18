import { CAMERA_TYPE } from "@src/constant/enum";
import { Line2d } from "@src/features/sketch_object/line2d";
import { SketchObject } from "@src/features/sketch_object/type";
import { SketchObjectTreeItem } from "@src/features/sketch_object_manager";
import { ValueOf } from "@src/util";
import { createStore } from "zustand/vanilla";
import { subscribeWithSelector } from "zustand/middleware";
import { Vector3 } from "three";


export type GlobalState = {
  selectedObjectList: SketchObject[];
  currentCameraType: ValueOf<typeof CAMERA_TYPE>;
  sketchObjectTreeRoot?: SketchObjectTreeItem;

  /** 用于区分是否处于 2d 草图模式 */
  sketcher2dBasePlane?: SketchObject;

  // #todo: 记录正在绘制的线段信息，通知完成绘制
  curDrawingLine2dStartPoint?: Vector3;
  curDrawingLine2dEndPoint?: Vector3;
};


export function createGlobalStore() {
  return createStore(subscribeWithSelector<GlobalState>(()=>({
    selectedObjectList: [],
    currentCameraType: CAMERA_TYPE.perspectiveCamera,
  })));
}

