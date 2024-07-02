import { ThreeCadEditor } from "sdk";
import { create } from "zustand";
import { type GlobalState } from "sdk";

export type StoreState = {
  threeCadEditor?: ThreeCadEditor;
  setThreeCadEditor: (threeCadEditor: ThreeCadEditor | undefined) => void;

  sketchObjectTree?: GlobalState["sketchObjectTree"];
  setSketchObjectTree: (
    sketchObjectTree: GlobalState["sketchObjectTree"],
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
}));
