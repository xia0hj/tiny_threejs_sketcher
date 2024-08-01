import { ThreeCadEditor } from "tiny_threejs_sketcher";
import { create } from "zustand";
import { type GlobalState } from "tiny_threejs_sketcher";
import { WithSetter } from "@src/utils";

export type StoreState = WithSetter<{
  threeCadEditor?: ThreeCadEditor;
  sketchObjectTree?: GlobalState["sketchObjectTreeRoot"];
  selectedObjects: GlobalState["selectedObjects"];
}>;

export const useEditorStore = create<StoreState>((set) => ({
  threeCadEditor: undefined,
  setThreeCadEditor: (threeCadEditor) => set({ threeCadEditor }),

  sketchObjectTree: undefined,
  setSketchObjectTree: (sketchObjectTree) => set({ sketchObjectTree }),

  selectedObjects: [],
  setSelectedObjects: (selectedObjectList) =>
    set({ selectedObjects: selectedObjectList }),
}));
