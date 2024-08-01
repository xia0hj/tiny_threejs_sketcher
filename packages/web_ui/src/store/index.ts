import { TinyThreejsSketcher } from "tiny_threejs_sketcher";
import { create } from "zustand";
import { type SketcherState } from "tiny_threejs_sketcher";
import { WithSetter } from "@src/utils";

export type StoreState = WithSetter<{
  tinyThreejsSketcher?: TinyThreejsSketcher;
  sketchObjectTree?: SketcherState["sketchObjectTreeRoot"];
  selectedObjects: SketcherState["selectedObjects"];
}>;

export const useSketcherStore = create<StoreState>((set) => ({
  tinyThreejsSketcher: undefined,
  setTinyThreejsSketcher: (tinyThreejsSketcher) => set({ tinyThreejsSketcher: tinyThreejsSketcher }),

  sketchObjectTree: undefined,
  setSketchObjectTree: (sketchObjectTree) => set({ sketchObjectTree }),

  selectedObjects: [],
  setSelectedObjects: (selectedObjectList) =>
    set({ selectedObjects: selectedObjectList }),
}));
