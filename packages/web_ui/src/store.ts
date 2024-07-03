import { ThreeCadEditor } from "sdk";
import { create } from "zustand";
import { type GlobalState } from "sdk";

export type StoreState = {
  threeCadEditor?: ThreeCadEditor;
  setThreeCadEditor: (threeCadEditor: ThreeCadEditor | undefined) => void;

  sketchObjectTree?: GlobalState["sketchObjectTreeRoot"];
  setSketchObjectTree: (
    sketchObjectTree: GlobalState["sketchObjectTreeRoot"],
  ) => void;

  selectedObjectList: GlobalState["selectedObjectList"];
  setSelectedObjectList: (
    selectedObjectList: GlobalState["selectedObjectList"],
  ) => void;
};

export const useGlobalStore = create<StoreState>((set) => ({
  threeCadEditor: undefined,
  setThreeCadEditor(threeCadEditor) {
    set({
      threeCadEditor,
    });
  },

  sketchObjectTree: undefined,
  setSketchObjectTree(sketchObjectTree) {
    set({ sketchObjectTree });
  },

  selectedObjectList: [],
  setSelectedObjectList(selectedObjectList) {
    set({ selectedObjectList });
  },
}));
