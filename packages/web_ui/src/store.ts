import { RootRenderer } from "sdk";
import { create } from "zustand";

interface StoreState {
  rootRenderer: RootRenderer | null;
  setRootRenderer: (rootRenderer: RootRenderer) => void;
}

export const useStore = create<StoreState>((set) => ({
  rootRenderer: null,
  setRootRenderer: (rootRenderer) => {
    set({
      rootRenderer,
    });
  },
}));
