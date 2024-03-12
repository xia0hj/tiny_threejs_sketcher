import { RootRenderer } from "sdk";
import { create } from "zustand";

interface StoreState {
  rootRenderer?: RootRenderer;
  setRootRenderer: (rootRenderer: RootRenderer) => void;
}

export const useGlobalStore = create<StoreState>((set) => ({
  rootRenderer: undefined,
  setRootRenderer: (rootRenderer) => {
    set({
      rootRenderer,
    });
  },
}));
