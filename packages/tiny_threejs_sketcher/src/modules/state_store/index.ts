import {
    CAMERA_TYPE,
    CONTROLLER_NAME,
    ControllerNameUnion,
} from "@src/constant/enum"
import { MODULE_NAME, Module } from "@src/modules/module_registry"
import { BasePlane } from "@src/modules/sketch_object/base_plane"
import { SketchObject } from "@src/modules/sketch_object/interface"
import { SketchObjectTreeItem } from "@src/modules/sketch_object_manager"
import { ValueOf } from "@src/utils"
import mitt from "mitt"
import { Vector3 } from "three"

/**
 * @exports
 */
export type SketcherState = {
    curCameraType: ValueOf<typeof CAMERA_TYPE>
    controller: ControllerNameUnion

    hoverObject?: SketchObject

    sketchObjectTreeRoot?: SketchObjectTreeItem
    selectedObjects: SketchObject[]

    /** 用于区分是否处于 2d 草图模式 */
    editingBasePlane?: BasePlane

    /** 当前绘制线段的起点，注意需要克隆 Vector3 */
    drawingLine2dStartPoint?: Vector3

    /** 当前绘制线段的终点，注意需要克隆 Vector3 */
    drawingLine2dEndPoint?: Vector3

    drawingCircle2dCenter?: Vector3
    drawingCircle2dRadius?: number
}

export class StateStore implements Module {
    name = MODULE_NAME.StateStore
    private _emitter = mitt<SketcherState>()

    private _state: SketcherState = {
        curCameraType: CAMERA_TYPE.perspective_camera,
        selectedObjects: [],
        controller: CONTROLLER_NAME.default_viewer,
    }

    public getState(): SketcherState {
        return this._state
    }

    public setState(state: Partial<SketcherState>) {
        Object.entries(state).forEach(([key, value]) => {
            (this._state as Record<string, any>)[key] = value as any
            this._emitter.emit(key as keyof SketcherState, value)
        })
    }

    public listenState<K extends keyof SketcherState>(
        key: K,
        listener: (value: SketcherState[K]) => void,
    ) {
        this._emitter.on(key, listener)
        return () => this._emitter.off(key, listener)
    }

    dispose() {
        this._emitter.all.clear()
    }
}
