import { ThreeCadEditor } from "sdk";
import { create } from "zustand";
import { type GlobalState } from "sdk";
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
